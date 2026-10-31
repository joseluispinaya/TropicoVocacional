
let tablaData;
let tablaDataHis;
let listEstudRpt = [];
const { jsPDF } = window.jspdf;

$(document).ready(function () {
    cargarEstudiantes();
});

function cargarEstudiantes() {
    if ($.fn.DataTable.isDataTable("#tbDatas")) {
        $("#tbDatas").DataTable().destroy();
        $('#tbDatas tbody').empty();
    }

    tablaData = $("#tbDatas").DataTable({
        responsive: true,
        searching: false,
        "ajax": {
            "url": 'PanelListaEstudiantes.aspx/ListarEstIdUndEd',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return "{}";
            },
            "dataSrc": function (json) {
                // AQUÍ INTERCEPTAMOS LOS DATOS PARA EL CONTADOR
                if (json.d.Estado) {

                    let lista = json.d.Data;

                    if (lista != null && lista.length > 0) {
                        $("#btnReporte").prop("disabled", false);
                        $("#lblContadorEstudiantes").text(lista.length + " Alumnos");
                        listEstudRpt = lista;
                        return lista;
                    } else {
                        $("#btnReporte").prop("disabled", true);
                        $("#lblContadorEstudiantes").text("0 Alumnos");
                        return [];
                    }

                } else {
                    AlertaTimerTipo("Atención", json.d.Mensaje, "warning");
                    $("#btnReporte").prop("disabled", true);
                    $("#lblContadorEstudiantes").text("0 Alumnos");
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdEstudiante", "visible": false, "searchable": false },
            {
                "data": "FullName",
                "width": "55%",
                "orderable": false,
                "searchable": false,
                "className": "align-middle",
                "render": function (data, type, row) {
                    let imgUrl = row.Photo || '../images/sinimagen.png';
                    return `
                        <div class="media align-items-center">
                            <img src="${imgUrl}" alt="Estudiante" class="thumb-md rounded-circle m-r-15 bx-shadow" onerror="this.src='../images/sinimagen.png';"> 
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
                "width": "25%",
                "className": "align-middle",
                "render": function (data, type, row) {
                    let badgeEstado = row.Estado
                        ? '<span class="badge badge-success p-1"><i class="fa fa-check mr-1"></i>Activo</span>'
                        : '<span class="badge badge-danger p-1"><i class="fa fa-times mr-1"></i>Inactivo</span>';

                    // NUEVO: Evaluamos si está aprobado
                    let badgeAprobado = row.Aprobado
                        ? '<span class="badge badge-info p-1 mt-1 d-block"><i class="fas fa-unlock mr-1"></i>Acceso Permitido</span>'
                        : '<span class="badge badge-warning p-1 mt-1 d-block"><i class="fas fa-lock mr-1"></i>Pendiente Aprob.</span>';

                    return `
                        <div>
                            <span class="text-dark font-weight-bold d-block m-b-5"><i class="fa fa-id-card text-muted mr-2"></i>CI: ${data}</span>
                            ${badgeEstado}
                            ${badgeAprobado}
                        </div>
                    `;
                }
            },
            {
                "data": null,
                "width": "20%",
                "orderable": false,
                "searchable": false,
                "className": "text-center align-middle",
                "render": function (data, type, row) {
                    // Lógica para el botón de Aprobación
                    let btnAprobar = "";
                    if (row.Aprobado) {
                        // Si está aprobado, el botón es rojo para REVOCAR (Candado cerrado)
                        btnAprobar = `<button class="btn btn-outline-danger btn-sm btn-aprobar mb-1 w-100 shadow-sm" title="Revocar Acceso"><i class="fas fa-lock mr-2"></i>Revocar Acceso</button>`;
                    } else {
                        // Si no está aprobado, el botón es verde para APROBAR (Candado abierto)
                        btnAprobar = `<button class="btn btn-outline-success btn-sm btn-aprobar mb-1 w-100 shadow-sm" title="Permitir Acceso"><i class="fas fa-lock-open mr-2"></i>Aprobar Acceso</button>`;
                    }

                    return `
                        ${btnAprobar}
                        <button class="btn btn-primary btn-informa btn-sm w-100 shadow-sm">
                            <i class="fas fa-id-badge mr-2"></i>Ver Detalle
                        </button>
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

// Evento para el botón de Aprobar/Revocar
$('#tbDatas tbody').on('click', '.btn-aprobar', function () {
    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    let idEstudiante = data.IdEstudiante;
    let nombreEst = data.FullName;

    // Determinamos la acción inversa al estado actual
    let nuevoEstado = !data.Aprobado;
    let accionTexto = nuevoEstado ? "Aprobar Acceso" : "Revocar Acceso";

    // Quitamos las etiquetas HTML (<b>) porque esta versión de swal no las renderiza
    let mensajePregunta = nuevoEstado
        ? `¿Está seguro de permitir que ${nombreEst} ingrese a la aplicación?`
        : `¿Está seguro de revocar el acceso a ${nombreEst}? No podrá iniciar sesión.`;

    // Asignamos la clase del botón según la acción
    let claseBoton = nuevoEstado ? "btn-success" : "btn-danger";

    // Llamamos directamente a swal para poder personalizar la clase del botón
    swal({
        title: accionTexto,
        text: mensajePregunta,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: claseBoton, // Usa las clases de tu CSS
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: true // Se cierra al confirmar para mostrar el LoadingOverlay
    }, function (isConfirm) {
        if (isConfirm) {

            $("#tbDatas").closest(".card").LoadingOverlay("show");

            $.ajax({
                type: "POST",
                url: "PanelListaEstudiantes.aspx/CambiarAprobacion",
                data: JSON.stringify({
                    idEstudiante: idEstudiante,
                    estado: nuevoEstado,
                    correo: data.Correo,
                    estudiante: nombreEst
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    $("#tbDatas").closest(".card").LoadingOverlay("hide");

                    if (response.d.Estado) {
                        // Usamos tu función de alerta general
                        AlertaTimerTipo("Éxito", response.d.Mensaje, "success", 2000);
                        // Recargar la tabla sin perder la paginación actual
                        tablaData.ajax.reload(null, false);
                    } else {
                        AlertaTimerTipo("Atención", response.d.Mensaje, "warning", 2500);
                    }
                },
                error: function () {
                    $("#tbDatas").closest(".card").LoadingOverlay("hide");
                    AlertaTimerTipo("Error", "Error de comunicación con el servidor.", "error", 2500);
                }
            });
        }
    });
});

$('#tbDatas tbody').on('click', '.btn-informa', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    listaHistorialEst(data.IdEstudiante);
    $("#mdDetallesHis").modal("show");
    //swal("Mensaje", textoSms, "info")

});

function listaHistorialEst(idEstudiante) {
    if ($.fn.DataTable.isDataTable("#tbDataHist")) {
        $("#tbDataHist").DataTable().destroy();
        $('#tbDataHist tbody').empty();
    }

    var request = {
        IdEstudiante: parseInt(idEstudiante)
    };

    tablaDataHis = $("#tbDataHist").DataTable({
        responsive: true,
        searching: false,
        info: false,
        "ajax": {
            "url": '/PageEstudiantes.aspx/HistorialTestEst',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdTest", "visible": false, "searchable": false },
            {
                "data": "ObservacionGeneralIA",
                "className": "text-wrap text-muted align-middle",
                "render": function (data) {
                    // Texto en cursiva con icono de comillas
                    return `<div><i class="fas fa-quote-left fa-fw text-secondary mr-1"></i> <em>${data}</em></div>`;
                }
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function GenerarReporteEst() {
    // 1. Configuración Inicial (Portrait = Vertical)
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    // Variables de dimensiones de la hoja (Dinámicas)
    const pageWidth = doc.internal.pageSize.width;   // Aprox 210mm en A4 vertical
    const pageHeight = doc.internal.pageSize.height; // Aprox 297mm en A4 vertical
    const fechaActual = new Date().toLocaleDateString("es-BO");
    const undEdu = usuarioGlobal.NombreUnidadEducativa ? `UND: ${usuarioGlobal.NombreUnidadEducativa}` : "UNIDAD EDUCATIVA";
    const cantReg = `Total Registros: ${listEstudRpt.length}.`;

    // ==========================================
    // 2. ENCABEZADO Y LOGO
    // ==========================================

    // Intentar cargar logo
    var img = new Image();
    img.src = "/images/membrete.png";
    try {
        doc.addImage(img, 'PNG', 10, 10, 60, 30); // x, y, ancho, alto
    } catch (e) {
        console.warn("No se pudo cargar el logo, verifique la ruta.");
    }

    // Datos del Reporte (Derecha) - Alineado hacia la derecha
    doc.setTextColor(0); // Negro
    doc.setFontSize(12);
    doc.text(undEdu, pageWidth - 15, 15, { align: "right" });

    doc.setFontSize(10);
    doc.text("Sistema: Vocacional", pageWidth - 15, 25, { align: "right" });
    doc.text("Fecha: " + fechaActual, pageWidth - 15, 30, { align: "right" });
    doc.text("Nro Reporte: REP-0006", pageWidth - 15, 35, { align: "right" });

    doc.setFontSize(12);
    doc.text("Lista de Estudiantes", pageWidth / 2, 45, { align: "center" });

    // ==========================================
    // 3. CONFIGURACIÓN DE LA TABLA
    // ==========================================

    const headers = [["#", "Estudiantes", "Nro CI", "Correo"]];

    const data = listEstudRpt.map((item, index) => [
        index + 1,
        item.FullName,
        item.NroCi,
        item.Correo
    ]);

    doc.autoTable({
        startY: 50, // Posición Y donde empieza la tabla
        head: headers,
        body: data,
        theme: 'grid',
        styles: {
            fontSize: 9, // Reduje ligeramente la fuente para que respire mejor en vertical
            cellPadding: 2,
            valign: 'middle'
        },
        headStyles: {
            fillColor: [22, 160, 133], // Color Verde Teal
            textColor: 255,
            halign: 'center',
            fontStyle: 'bold'
        },
        // DEFINICIÓN DE ANCHOS PERSONALIZADOS (Ajustados para los 180mm disponibles)
        columnStyles: {
            0: { cellWidth: 10, halign: 'center' }, // # (10mm)
            1: { cellWidth: 75 },                   // Estudiantes (75mm)
            2: { cellWidth: 40, halign: 'center' }, // CI (40mm)
            3: { cellWidth: 55, halign: 'center' } // Correo (55mm)
        },
        margin: { left: 15, right: 15 } // Márgenes laterales (30mm en total)
    });

    // ==========================================
    // 4. TOTALES Y FIRMA (Dinámico)
    // ==========================================

    let finalY = doc.lastAutoTable.finalY;

    // Verificar si queda espacio para la firma, si no, crear nueva página
    // Como es vertical, hay más espacio abajo, pero validamos igual
    if (finalY + 50 > pageHeight) {
        doc.addPage();
        finalY = 20;
    }

    // Total General
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(cantReg, pageWidth - 15, finalY + 10, { align: "right" });

    // --- LÓGICA DE FIRMA CENTRADA ---
    const firmaY = finalY + 40;
    const lineLength = 70;

    const xLineStart = (pageWidth - lineLength) / 2;
    const xLineEnd = xLineStart + lineLength;

    doc.setLineWidth(0.5);
    doc.line(xLineStart, firmaY, xLineEnd, firmaY);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Firma del Responsable", pageWidth / 2, firmaY + 5, { align: "center" });

    // ==========================================
    // 5. PIE DE PÁGINA (Fijo al fondo)
    // ==========================================

    const totalPages = doc.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);

        doc.setFontSize(8);
        doc.setTextColor(150);

        doc.text(`Generado por Sistema Vocacional - ${fechaActual}`, 15, pageHeight - 10);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - 15, pageHeight - 10, { align: "right" });
    }

    // ==========================================
    // 6. GUARDAR
    // ==========================================
    doc.save(`Detalle_${fechaActual.replace(/\//g, "-")}.pdf`);
}

// LLAMADA AL EVENTO (Tal cual lo solicitaste)
$("#btnReporte").on("click", function () {
    if (listEstudRpt.length < 1) {
        swal("Mensaje", "No se puede generar reporte vacío, verifique que existan resultados.", "warning");
        return;
    }
    GenerarReporteEst();
});

// fin