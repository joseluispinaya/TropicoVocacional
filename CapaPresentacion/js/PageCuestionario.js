
let tablaData;
let tablaDataPregunta;
let idEditar = 0;
const { jsPDF } = window.jspdf;
let listaPreguntas = [];

$(document).ready(function () {

    listaCuestionarios();
});

function listaCuestionarios() {
    if ($.fn.DataTable.isDataTable("#tbDatas")) {
        $("#tbDatas").DataTable().destroy();
        $('#tbDatas tbody').empty();
    }

    tablaData = $("#tbDatas").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageCuestionario.aspx/ListaCuestionarios',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
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
            { "data": "IdCuestionario", "visible": false, "searchable": false },
            { "data": "Titulo", "className": "align-middle" },
            { "data": "Descripcion", "className": "align-middle" },
            { "data": "CantiPreg", "className": "align-middle" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="btn btn-info btn-detalle btn-sm"><i class="fas fa-address-book"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "90px",
                "className": "text-center align-middle"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#tbDatas tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdCuestionario;
    $("#txtTitulo").val(data.Titulo);
    $("#txtDescripcion").val(data.Descripcion);
    $("#myModalLabel").text("Editar Cuestionario");
    $("#mdData").modal("show");

});

$('#tbDatas tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `Detalle de: ${data.Titulo}.`;
    detalleCuestionario(data.IdCuestionario);
    $("#myModalLabeldett").text(textoSms);
    $("#mdDetalles").modal("show");

});

function detalleCuestionario(idCuestionario) {
    if ($.fn.DataTable.isDataTable("#tbPreguntas")) {
        $("#tbPreguntas").DataTable().destroy();
        $('#tbPreguntas tbody').empty();
    }

    var request = {
        IdCuestionario: parseInt(idCuestionario)
    };

    tablaDataPregunta = $("#tbPreguntas").DataTable({
        responsive: true,
        searching: false,
        info: false,
        "ajax": {
            "url": 'PagePreguntas.aspx/ListaPreguntasId',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    listaPreguntas = json.d.Data || [];
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdPregunta", "visible": false, "searchable": false },
            { "data": "Texto", "className": "align-middle" }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#btnRegistro").on("click", function () {

    idEditar = 0;
    $("#txtTitulo").val("");
    $("#txtDescripcion").val("");
    $("#myModalLabel").text("Nuevo Registro");

    $("#mdData").modal("show");
})

function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}

$("#btnGuardarCambios").on("click", function () {
    // Bloqueo inmediato
    $('#btnGuardarCambios').prop('disabled', true);

    if ($("#txtTitulo").val().trim() === "") {
        MostrarToastZer("Debe Completar el Titulo.", "Atención", "warning");
        //toastr.warning("", "Debe Completar el Titulo");
        $("#txtTitulo").focus();
        habilitarBoton();
        return;
    }

    if ($("#txtDescripcion").val().trim() === "") {
        MostrarToastZer("Debe Agregar una Descripcion.", "Atención", "warning");
        //toastr.warning("", "Debe Agregar una Descripcion");
        $("#txtDescripcion").focus();
        habilitarBoton();
        return;
    }

    const objeto = {
        IdCuestionario: idEditar,
        Titulo: $("#txtTitulo").val().trim(),
        Descripcion: $("#txtDescripcion").val().trim()
    }

    $("#mdData").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "PageCuestionario.aspx/GuardarOrEditCuestionario",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#mdData").find("div.modal-content").LoadingOverlay("hide");
            MostrarAlerta(
                response.d.Estado ? '¡Excelente!' : 'Atención', // Título dinámico
                response.d.Mensaje, // Texto del servidor
                response.d.Valor // Icono (success/error/warning)
            );

            if (response.d.Estado) {
                $("#mdData").modal("hide");
                listaCuestionarios();
                idEditar = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#mdData").find("div.modal-content").LoadingOverlay("hide");
            toastr.error("No se pudo conectar con el servidor.");
        },
        complete: function () {
            habilitarBoton();
        }
    });

})

function GenerarReporte() {
    // 1. Configuración Inicial (Portrait = Vertical)
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const fechaActual = new Date().toLocaleDateString("es-BO");

    // Limpiamos el texto extra que viene del modal para tener solo el nombre real
    const textoModal = $("#myModalLabeldett").text();
    const tituloCuestionario = textoModal.replace("Detalle de: ", "").trim();

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
    doc.text("REPORTE DE CUESTIONARIO", pageWidth - 15, 20, { align: "right" });

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
    doc.text("1. DATOS DEL CUESTIONARIO", 15, 50);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Título: ${tituloCuestionario}`, 15, 58);
    doc.text(`Total de Preguntas: ${listaPreguntas.length}`, 15, 64);

    // ==========================================
    // 4. CONFIGURACIÓN DE LA TABLA
    // ==========================================
    const headers = [["#", "PREGUNTAS DISPONIBLES"]];
    const data = listaPreguntas.map((item, index) => [
        index + 1,
        item.Texto
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
            1: { cellWidth: 168 }
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
    let nombreArchivoLimpio = tituloCuestionario.replace(/[^a-zA-Z0-9]/g, "_");
    doc.save(`Cuestionario_${nombreArchivoLimpio}_${fechaActual.replace(/\//g, "")}.pdf`);
}

$("#btnReport").on("click", function () {
    if (listaPreguntas.length < 1) {
        swal("Mensaje", "No se puede generar reporte vacío, verifique que existan resultados.", "warning");
        return;
    }
    GenerarReporte();
});

// fin