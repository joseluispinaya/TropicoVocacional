
let tablaData;
let tablaDataEst;
let idEditar = 0;
const { jsPDF } = window.jspdf;
let listaTemp = [];

$(document).ready(function () {

    listaUnidadesEd();
});

function listaUnidadesEd() {
    if ($.fn.DataTable.isDataTable("#tbDatas")) {
        $("#tbDatas").DataTable().destroy();
        $('#tbDatas tbody').empty();
    }

    tablaData = $("#tbDatas").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageUndsEducativas.aspx/ListaUndEducativas',
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
            { "data": "IdUnidadEducativa", "visible": false, "searchable": false },
            { "data": "Nombre", "className": "align-middle" },
            { "data": "NroContacto", "className": "align-middle" },
            { "data": "Responsable", "className": "align-middle" },
            { "data": "FechaCreado", "className": "align-middle" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="btn btn-info btn-detalle btn-sm"><i class="fas fa-address-book"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "100px",
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
    idEditar = data.IdUnidadEducativa;
    $("#txtnombres").val(data.Nombre);
    $("#txtNroCel").val(data.NroContacto);
    $("#txtUbicacion").val(data.Ubicacion);
    $("#myModalLabel").text("Editar Registro");
    $("#mdData").modal("show");

});

$('#tbDatas tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    const textoSms = `U.E.: ${data.Nombre}.`;
    detalleEstudiantes(data.IdUnidadEducativa);
    //swal("Mensaje", textoSms, "success")
    $("#myModalLabeldett").text(textoSms);
    $("#mdDetalles").modal("show");

});

function detalleEstudiantes(idUnidadEducativa) {
    if ($.fn.DataTable.isDataTable("#tbDetalleEs")) {
        $("#tbDetalleEs").DataTable().destroy();
        $('#tbDetalleEs tbody').empty();
    }

    var request = {
        IdUnidadEdu: parseInt(idUnidadEducativa)
    };

    tablaDataEst = $("#tbDetalleEs").DataTable({
        responsive: true,
        searching: false,
        info: false,
        "ajax": {
            "url": 'PageUndsEducativas.aspx/ListarEstIdUndEd',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    listaTemp = json.d.Data || [];
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdEstudiante", "visible": false, "searchable": false },
            {
                //FullName es una propiedad de solo lectura que tiene Nombres y Apellidos
                "data": "FullName",
                "className": "align-middle",
                "render": function (data, type, row) {
                    let colorBorde = '#fff';
                    let imgUrl = row.Photo || 'images/sinimagen.png';

                    return `
                        <div class="d-flex align-items-center">
                            <div class="position-relative mr-3">
                                <img src="${imgUrl}" 
                                    alt="Logo"
                                    class="rounded-circle"
                                    style="width: 40px; height: 40px; object-fit: cover; border: 1px solid ${colorBorde}; padding: 2px; background: #fff;"
                                    onerror="this.src='/images/sinimagen.png';"> 
                            </div>
                            <div style="line-height: 1.2;">
                                <span class="font-weight-bold text-dark" style="font-size: 1em;">
                                    ${data}
                                </span>
                                <br/>
                                <small class="text-muted">${row.Correo}</small>
                            </div>
                        </div>
                    `;
                }
            },
            {
                "data": "Estado", "className": "text-center align-middle", "render": function (data) {
                    if (data === true)
                        return '<span class="badge badge-primary">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#btnRegistro").on("click", function () {

    idEditar = 0;
    $("#txtnombres").val("");
    $("#txtNroCel").val("");
    $("#txtUbicacion").val("");

    $("#myModalLabel").text("Nuevo Registro");

    $("#mdData").modal("show");

})

function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}

$("#btnGuardarCambios").on("click", function () {
    // Bloqueo inmediato
    $('#btnGuardarCambios').prop('disabled', true);

    const inputs = $("#mdData input.model").serializeArray();
    const inputs_sin_valor = inputs.filter(item => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        habilitarBoton();
        return;
    }

    const objeto = {
        IdUnidadEducativa: idEditar,
        Nombre: $("#txtnombres").val().trim(),
        NroContacto: $("#txtNroCel").val().trim(),
        Ubicacion: $("#txtUbicacion").val().trim()
        //Estado: ($("#cboEstado").val() == "1" ? true : false)
    }

    $("#mdData").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "PageUndsEducativas.aspx/GuardarOrEditUnidadesEdu",
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
                listaUnidadesEd();
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

function GenerarReporteEst() {
    // 1. Configuración Inicial (Portrait = Vertical)
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    // Variables de dimensiones de la hoja (Dinámicas)
    const pageWidth = doc.internal.pageSize.width;   // Aprox 210mm en A4 vertical
    const pageHeight = doc.internal.pageSize.height; // Aprox 297mm en A4 vertical
    const fechaActual = new Date().toLocaleDateString("es-BO");
    //$("#myModalLabeldett").text();
    const nomRecinto = $("#myModalLabeldett").text();
    const cantReg = `Total Registros: ${listaTemp.length}.`;

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
    doc.text(nomRecinto, pageWidth - 15, 15, { align: "right" });

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

    const data = listaTemp.map((item, index) => [
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
    doc.save(`Detalle_${nomRecinto}_${fechaActual.replace(/\//g, "-")}.pdf`);
}

// LLAMADA AL EVENTO (Tal cual lo solicitaste)
$("#btnReport").on("click", function () {
    if (listaTemp.length < 1) {
        swal("Mensaje", "No se puede generar reporte vacío, verifique que existan resultados.", "warning");
        return;
    }
    GenerarReporteEst();
});

$("#btnAlerFire").on("click", function () {
    MostrarConfirmacion("¿Eliminar registro?", "Esta acción no se puede deshacer.", "Sí, eliminar", function () {
        // Aquí pones tu llamada AJAX o lógica de eliminación
        MostrarAlerta("¡Eliminado!", "El archivo ha sido borrado.", "success");
    });
})

$("#btnSwaler").on("click", function () {
    MostrarDecision("¿Desea enviar los datos?", "Se registrará en la base de datos.", "Sí, enviar", "No, revisar",
        function() {
            MostrarAlerta("¡Enviado!", "Datos guardados.", "success");
        },
        function() {
            MostrarAlerta("Cancelado", "Puedes seguir editando.", "error");
        }
    );
})

$("#btnTimerau").on("click", function () {
    MostrarToastZer("El registro se actualizó correctamente.", "Éxito", "success");
    //MostrarToastZer("Debe seleccionar Und Educativa.", "Atención", "warning");
    //MostrarToastFijo("No se pudo conectar con el servidor. Intente más tarde.", "Error de Conexión");
    //MostrarAlertaTimer("¡Guardado automático!", "Tus respuestas se han guardado.", 3000);
})

// fin codigo