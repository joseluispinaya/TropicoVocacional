
// VARIABLES GLOBALES EN MEMORIA
let tablaData;
let tablaDataHis;
let tablaDetallesHi;

let estudianteSelect = null;
let listHistoriaRpt = [];
const { jsPDF } = window.jspdf;

$(document).ready(function () {

    // 1. CONFIGURACIÓN DEL SELECT2 (Buscador de Docentes)
    $("#cboBuscarEstudian").select2({
        placeholder: "Escriba el nombre, apellido o CI estudiante...",
        allowClear: true,
        ajax: {
            url: "PanelEstudiantes.aspx/BuscarEstudianteSelect2",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            delay: 300, // Espera 300ms después de que el usuario deja de escribir
            data: function (params) {
                return JSON.stringify({ busqueda: params.term || "" });
            },
            processResults: function (data) {
                var items = data.d.Data || [];
                return {
                    results: $.map(items, function (item) {
                        return {
                            id: item.IdEstudiante,
                            text: item.NroCi + ' - ' + item.FullName,
                            // Guardamos datos extra para usarlos al seleccionar
                            imgUrl: item.Photo,
                            ci: item.NroCi,
                            nombres: item.FullName,
                            dataCompleta: item
                        }
                    })
                };
            },
            cache: true
        }
    });

    // EVENTO: Al seleccionar un docente del Select2
    $('#cboBuscarEstudian').on('select2:select', function (e) {
        var data = e.params.data;
        estudianteSelect = data.dataCompleta;
        //console.log("Estudiante seleccionado:", estudianteSelect);

        // Asignamos el ID al input oculto
        $("#txtIdEstudiante").val(data.id);

        // Actualizamos la tarjeta de presentación "EST: " + data.nombres
        $("#lblNombres").text("EST: " + data.nombres);
        $("#lblDatos").text("Nro de CI: " + data.ci).removeClass("badge-secondary").addClass("badge-info");

        // Actualizamos la foto (si no tiene, mantiene la por defecto)
        let imagenBase = data.imgUrl ? data.imgUrl : "../images/sinimagen.png";
        $("#imgEstde").attr("src", imagenBase);

        listaHistorialEst(data.id);
    });

    // EVENTO: Al limpiar el Select2
    $('#cboBuscarEstudian').on('select2:unselect', function (e) {
        $("#txtIdEstudiante").val("0");
        $("#lblNombres").text("Esperando..");
        $("#lblDatos").text("Seleccione un estudiante").removeClass("badge-info").addClass("badge-secondary");
        $("#imgEstde").attr("src", "../images/sinimagen.png");

        //$("#seccionDetalle").hide();

        if ($.fn.DataTable.isDataTable("#tbDataHist")) {
            $("#tbDataHist").DataTable().clear().draw();
        }

        //$("#lblMateriaSelect").text("Esperando...");
        //$("#btnReporte").prop("disabled", true);
    });

}); // Fin document.ready

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
            },
            {
                "defaultContent": '<button class="btn btn-success btn-ver btn-sm"><i class="fas fa-eye"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "50px",
                "className": "text-center align-middle"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#tbDataHist tbody').on('click', '.btn-ver', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaDataHis.row(fila).data();
    //const textoSms = $("#lblNombreEsr").text();
    detalleHistorialEst(data.IdTest);
    $("#lblObservaGen").text(data.ObservacionGeneralIA);
    $("#txtFechaTest").val(data.FechaTest);
    //$("#myModalLabeldett").text(textoSms);
    $("#mdDetalles").modal("show");
    //swal("Mensaje", textoSms, "info")

});

function detalleHistorialEst(idTest) {
    if ($.fn.DataTable.isDataTable("#tbDetalleHistor")) {
        $("#tbDetalleHistor").DataTable().destroy();
        $('#tbDetalleHistor tbody').empty();
    }

    var request = {
        IdTest: parseInt(idTest)
    };

    tablaDetallesHi = $("#tbDetalleHistor").DataTable({
        responsive: true,
        autoWidth: false,
        // Como son máximo 3 carreras, ocultamos controles para que se vea como un "Widget" limpio
        paging: false,
        searching: false,
        info: false,
        "ajax": {
            "url": '/PageEstudiantes.aspx/DetalleHistorialTest',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    listHistoriaRpt = json.d.Data;
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            {
                "data": "Carrera",
                "width": "25%",
                "className": "align-middle",
                "render": function (data) {
                    // Diseño hermoso: Icono de graduación en círculo + Nombre de carrera
                    return `
                        <div class="d-flex align-items-center">
                            <div class="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white mr-3" style="width: 40px; height: 40px; min-width: 40px;">
                                <i class="fas fa-user-graduate" style="font-size: 1.1rem;"></i>
                            </div>
                            <div style="line-height: 1.2;">
                                <div class="font-weight-bold text-dark" style="font-size: 13px;">${data}</div>
                                <small class="text-muted">Carrera Sugerida</small>
                            </div>
                        </div>
                    `;
                }
            },
            {
                "data": "Justificacion",
                "width": "50%",
                "className": "text-wrap text-muted align-middle",
                "render": function (data) {
                    // Texto en cursiva con icono de comillas
                    return `<div><i class="fas fa-quote-left fa-fw text-secondary mr-1"></i> <em>${data}</em></div>`;
                }
            },
            {
                "data": "Puntaje",
                "width": "25%",
                "className": "align-middle",
                "render": function (data) {
                    // Redondeamos el puntaje (ej. 95.5 -> 96)
                    let puntaje = Math.round(data);

                    // Lógica de colores adaptada a las clases de TU plantilla
                    let colorClass = "progress-bar-success"; // Verde para alta afinidad (>= 80)
                    if (puntaje < 86) colorClass = "progress-bar-warning"; // 80 origi Amarillo para media (60 a 79)
                    if (puntaje < 60) colorClass = "progress-bar-danger"; // Rojo para baja (< 60)

                    // Barra de progreso de tu template
                    return `
                        <div class="text-left mb-1 font-weight-bold" style="font-size: 12px; color: #555;">
                            Afinidad IA: <span class="float-right">${puntaje}%</span>
                        </div>
                        <div class="progress" style="height: 12px;">
                            <div class="progress-bar ${colorClass} progress-bar-striped" role="progressbar" aria-valuenow="${puntaje}" aria-valuemin="0" aria-valuemax="100" style="width: ${puntaje}%">
                            </div>
                        </div>
                    `;
                }
            }
        ],
        // Mantenemos el orden por la columna 2 (Puntaje) descendente
        "order": [[2, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#btnReport").on("click", function () {
    if (listHistoriaRpt.length < 1) {
        swal("Mensaje", "No se puede generar reporte vacío, verifique que existan resultados.", "warning");
        return;
    }
    GenerarReporteTests();
});

function GenerarReporteTests() {
    // Validar que exista el estudiante antes de generar el reporte
    if (!estudianteSelect || listHistoriaRpt.length === 0) {
        swal("Atención", "No hay datos suficientes para generar el reporte.", "warning");
        return;
    }

    // 1. Configuración Inicial
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const fechaActual = new Date().toLocaleDateString("es-BO");

    // Captura de datos de la interfaz y variables globales
    const nombreUni = usuarioGlobal.NombreUnidadEducativa ? usuarioGlobal.NombreUnidadEducativa : "UNIDAD EDUCATIVA";
    const observacionGen = $("#lblObservaGen").text().trim();
    const fechaTest = $("#txtFechaTest").val().trim();

    // ==========================================
    // 2. ENCABEZADO Y LOGO
    // ==========================================
    var img = new Image();
    img.src = "/images/membrete.png";
    try {
        doc.addImage(img, 'PNG', 15, 10, 55, 25);
    } catch (e) {
        console.warn("No se pudo cargar el logo, verifique la ruta.");
    }

    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("RESULTADOS DEL TEST VOCACIONAL", pageWidth - 15, 20, { align: "right" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Sistema de Orientación Vocacional IA", pageWidth - 15, 26, { align: "right" });
    doc.text(`Fecha de Emisión: ${fechaActual}`, pageWidth - 15, 31, { align: "right" });

    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.5);
    doc.line(15, 40, pageWidth - 15, 40);

    // ==========================================
    // 3. DATOS DEL ESTUDIANTE (Dos Columnas)
    // ==========================================
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("1. DATOS DEL ESTUDIANTE", 15, 50);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    // Columna 1
    doc.text(`Estudiante: ${estudianteSelect.FullName}`, 15, 58);
    doc.text(`Unidad Educativa: ${nombreUni}`, 15, 64);

    // Columna 2
    doc.text(`C.I.: ${estudianteSelect.NroCi}`, 120, 58);
    doc.text(`Realizado el: ${fechaTest}`, 120, 64);

    // ==========================================
    // 4. ANÁLISIS GENERAL DE LA IA
    // ==========================================
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("2. ANÁLISIS DEL PERFIL", 15, 78);

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic"); // Cursiva para citas de la IA
    doc.setTextColor(80, 80, 80); // Gris oscuro

    // Dividir el texto largo en múltiples líneas para que no se salga de la hoja (margen derecho 15mm)
    const lineasObservacion = doc.splitTextToSize(`"${observacionGen}"`, pageWidth - 30);
    doc.text(lineasObservacion, 15, 86);

    // Calcular en qué posición "Y" terminó el texto para colocar la tabla debajo
    let nextY = 86 + (lineasObservacion.length * 5) + 10;
    doc.setTextColor(0); // Restaurar a color negro

    // ==========================================
    // 5. TABLA DE RECOMENDACIONES
    // ==========================================
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("3. TOP CARRERAS RECOMENDADAS", 15, nextY);

    const headers = [["#", "CARRERA", "JUSTIFICACIÓN (IA)", "AFINIDAD"]];
    const data = listHistoriaRpt.map((item, index) => [
        index + 1,
        item.Carrera,
        item.Justificacion,
        `${Math.round(item.Puntaje)}%`
    ]);

    doc.autoTable({
        startY: nextY + 5,
        head: headers,
        body: data,
        theme: 'grid',
        styles: {
            fontSize: 9,
            cellPadding: 3,
            valign: 'middle'
        },
        headStyles: {
            fillColor: [0, 123, 255], // Azul primario para destacar que son resultados
            textColor: 255,
            halign: 'center',
            fontStyle: 'bold'
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245]
        },
        columnStyles: {
            0: { cellWidth: 10, halign: 'center', fontStyle: 'bold' },
            1: { cellWidth: 40, fontStyle: 'bold' },
            2: { cellWidth: 105, fontStyle: 'italic', textColor: [80, 80, 80] }, // Justificación en cursiva y gris
            3: { cellWidth: 25, halign: 'center', fontStyle: 'bold' }
        },
        margin: { left: 15, right: 15 }
    });

    // ==========================================
    // 6. PIE Y FIRMA
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

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(xLineStart, firmaY, xLineEnd, firmaY);

    doc.setFontSize(10);
    doc.text("Firma del Estudiante", pageWidth / 2, firmaY + 5, { align: "center" });

    // Paginación
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Generado por Sistema Vocacional IA - ${fechaActual}`, 15, pageHeight - 10);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - 15, pageHeight - 10, { align: "right" });
    }

    // Exportar con nombre limpio del estudiante
    let nombreArchivoLimpio = estudianteSelect.FullName.replace(/[^a-zA-Z0-9]/g, "_");
    doc.save(`ResultadosTest_${nombreArchivoLimpio}_${fechaActual.replace(/\//g, "")}.pdf`);
}

// fin