
let tablaData;
let listEstudRpt = [];
const { jsPDF } = window.jspdf;

$(document).ready(function () {
    cargarUndEduca();
});

function cargarUndEduca() {
    $("#cboUnidadEducativa").html('<option value="">Cargando Unidades Educativas...</option>');
    $("#cboUnidadEducativa").prop("disabled", true);

    $.ajax({
        type: "POST",
        url: "PageUndsEducativas.aspx/ListaUndEducativas",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                const lista = response.d.Data;

                if (lista != null && lista.length > 0) {
                    let opcionesHTML = '<option value="">-- Seleccione una Unidad Educativa --</option>';

                    $.each(lista, function (i, row) {
                        opcionesHTML += `<option value="${row.IdUnidadEducativa}">${row.Nombre}</option>`;
                    });

                    $("#cboUnidadEducativa").html(opcionesHTML);
                    $("#cboUnidadEducativa").prop("disabled", false);

                } else {
                    $("#cboUnidadEducativa").html('<option value="">Sin Unidades Educativas disponibles</option>');
                }
            } else {
                $("#cboUnidadEducativa").html('<option value="">Ocurrio un error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboUnidadEducativa").html('<option value="">Error de conexión</option>');
        }
    });
}

// ==========================================
// EVENTO CHANGE DEL SELECT
// ==========================================
$("#cboUnidadEducativa").on("change", function () {
    const idUnidadEducativa = $(this).val();

    if (idUnidadEducativa) {
        // Habilitamos el botón y cargamos la tabla
        $("#btnGenerarReporte").prop("disabled", false);
        cargarEstudiantesPorColegio(idUnidadEducativa);
    } else {
        // Deshabilitamos el botón y reiniciamos el contador
        $("#btnGenerarReporte").prop("disabled", true);
        $("#lblContadorEstudiantes").text("0 Alumnos");

        // Destruimos DataTables si existe para poder restaurar el diseño original
        if ($.fn.DataTable.isDataTable("#tbDatas")) {
            $("#tbDatas").DataTable().destroy();
        }

        // Restauramos el Placeholder visualmente
        $("#tbDatas tbody").html(`
            <tr id="rowPlaceholder">
                <td colspan="3" class="text-center text-muted p-t-30 p-b-30">
                    <i class="fas fa-school fa-2x m-b-10 d-block text-success"></i>
                    Por favor, seleccione una Unidad Educativa en el panel izquierdo para ver los registros.
                </td>
            </tr>
        `);
    }
});

// ==========================================
// CARGA Y RENDERIZADO DE DATATABLES
// ==========================================
function cargarEstudiantesPorColegio(idUnidadEducativa) {
    if ($.fn.DataTable.isDataTable("#tbDatas")) {
        $("#tbDatas").DataTable().destroy();
        $('#tbDatas tbody').empty();
    }

    var request = {
        IdUnidadEdu: parseInt(idUnidadEducativa)
    };

    tablaData = $("#tbDatas").DataTable({
        responsive: true,
        searching: false, // Desactivado si solo muestras los de un colegio
        "ajax": {
            "url": 'PageUndsEducativas.aspx/ListarEstIdUndEd',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                // AQUÍ INTERCEPTAMOS LOS DATOS PARA EL CONTADOR
                if (json.d.Estado) {
                    let datos = json.d.Data;
                    $("#lblContadorEstudiantes").text(datos.length + " Alumnos");
                    listEstudRpt = datos;
                    return datos;
                } else {
                    $("#lblContadorEstudiantes").text("0 Alumnos");
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdEstudiante", "visible": false, "searchable": false },
            {
                "data": "FullName",
                "orderable": false,
                "searchable": false,
                "className": "align-middle",
                "render": function (data, type, row) {
                    let imgUrl = row.Photo || 'images/sinimagen.png';

                    // Diseño mejorado usando clases de espaciado del Webadmin
                    return `
                        <div class="media align-items-center">
                            <img src="${imgUrl}" alt="Estudiante" class="thumb-md rounded-circle m-r-15 bx-shadow" onerror="this.src='images/sinimagen.png';"> 
                            <div class="media-body">
                                <h5 class="m-0 font-15 text-dark">${data}</h5>
                                <p class="text-muted m-b-0 font-13"><i class="fa fa-envelope m-r-5"></i>${row.Correo}</p>
                            </div>
                        </div>
                    `;
                }
            },
            {
                "data": "NroCi",
                "className": "align-middle text-right", // Alineado a la derecha para equilibrar
                "render": function (data, type, row) {
                    // EVALUACIÓN DEL ESTADO BOOLEANO
                    let badgeEstado = row.Estado
                        ? '<span class="badge badge-success p-1"><i class="fa fa-check m-r-5"></i>Activo</span>'
                        : '<span class="badge badge-danger p-1"><i class="fa fa-times m-r-5"></i>Inactivo</span>';

                    return `
                        <div>
                            <span class="text-dark font-weight-bold d-block m-b-5"><i class="fa fa-id-card text-muted m-r-5"></i>CI: ${data}</span>
                            ${badgeEstado}
                        </div>
                    `;
                }
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json",
            "emptyTable": "No se encontraron estudiantes registrados en esta Unidad Educativa."
        }
    });
}

// Evento del botón de Reporte
$("#btnGenerarReporte").on("click", function () {
    //var idColegio = $("#cboUnidadEducativa").val();
    if (listEstudRpt.length < 1) {
        swal("Mensaje", "No se puede generar reporte vacío, verifique que existan resultados.", "warning");
        return;
    }
    GenerarReporteEst();
});

function GenerarReporteEst() {
    // 1. Configuración Inicial (Portrait = Vertical)
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const fechaActual = new Date().toLocaleDateString("es-BO");
    const nombreUni = $("#cboUnidadEducativa option:selected").text().trim();

    // ==========================================
    // 2. ENCABEZADO Y LOGO
    // ==========================================
    var img = new Image();
    img.src = "/images/membrete.png";
    try {
        // Respetando tus dimensiones exactas
        doc.addImage(img, 'PNG', 15, 10, 55, 25);
    } catch (e) {
        console.warn("No se pudo cargar el logo, verifique la ruta.");
    }

    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("REPORTE DE ESTUDIANTES", pageWidth - 15, 20, { align: "right" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Sistema de Orientación Vocacional", pageWidth - 15, 26, { align: "right" });
    doc.text(`Fecha de Emisión: ${fechaActual}`, pageWidth - 15, 31, { align: "right" });

    // Línea separadora gris oscuro (más sutil que el negro puro)
    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.5);
    doc.line(15, 40, pageWidth - 15, 40);

    // ==========================================
    // 3. DATOS DE LAS PREGUNTAS
    // ==========================================
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("1. DETALLE DEL REPORTE", 15, 50);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`UND. EDUCATIVA: ${nombreUni}`, 15, 58);
    doc.text(`Total de Estudiantes: ${listEstudRpt.length}`, 15, 64);

    // ==========================================
    // 4. CONFIGURACIÓN DE LA TABLA
    // ==========================================
    const headers = [["#", "Estudiantes", "Nro CI", "Correo"]];
    const data = listEstudRpt.map((item, index) => [
        index + 1,
        item.FullName,
        item.NroCi,
        item.Correo
    ]);

    doc.autoTable({
        startY: 72, // Bajamos un poco para dar espacio a los metadatos
        head: headers,
        body: data,
        theme: 'grid',
        styles: {
            fontSize: 9,
            cellPadding: 3,
            valign: 'middle'
        },
        headStyles: {
            fillColor: [52, 58, 64], // Gris oscuro (estilo Webadmin)
            textColor: 255,
            halign: 'center',
            fontStyle: 'bold'
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245] // Efecto cebra suave
        },
        columnStyles: {
            0: { cellWidth: 12, halign: 'center', fontStyle: 'bold' },
            1: { cellWidth: 75 },                   // Estudiantes (75mm)
            2: { cellWidth: 38, halign: 'center' }, // CI (40mm)
            3: { cellWidth: 55, halign: 'center' } // Correo (55mm)
        },
        margin: { left: 15, right: 15 }
    });

    // ==========================================
    // 5. TOTALES Y FIRMA
    // ==========================================
    let finalY = doc.lastAutoTable.finalY;

    if (finalY + 40 > pageHeight) {
        doc.addPage();
        finalY = 20;
    }

    const firmaY = finalY + 30;
    const lineLength = 70;
    const xLineStart = (pageWidth - lineLength) / 2;
    const xLineEnd = xLineStart + lineLength;

    doc.setDrawColor(0, 0, 0); // Restaurar a negro para la firma
    doc.setLineWidth(0.5);
    doc.line(xLineStart, firmaY, xLineEnd, firmaY);

    doc.setFontSize(10);
    doc.text("Firma del Responsable", pageWidth / 2, firmaY + 5, { align: "center" });

    // ==========================================
    // 6. PIE DE PÁGINA
    // ==========================================
    const totalPages = doc.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Generado por Sistema Vocacional IA - ${fechaActual}`, 15, pageHeight - 10);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - 15, pageHeight - 10, { align: "right" });
    }

    // Guardado con nombre limpio para evitar errores de sistema de archivos
    let nombreArchivoLimpio = nombreUni.replace(/[^a-zA-Z0-9]/g, "_");
    doc.save(`Reporte_${nombreArchivoLimpio}_${fechaActual.replace(/\//g, "")}.pdf`);
}

// fin