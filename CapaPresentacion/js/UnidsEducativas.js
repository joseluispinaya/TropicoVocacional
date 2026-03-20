
let tablaData;
let idEditar = 0;

function listaUnidadesEd() {
    if ($.fn.DataTable.isDataTable("#tbDatas")) {
        $("#tbDatas").DataTable().destroy();
        $('#tbDatas tbody').empty();
    }

    tablaData = $("#tbDatas").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageUndsEducativas.aspx/ListaUnidadesEd',
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
            { "data": "Nombre" },
            { "data": "Ubicacion" },
            { "data": "NroContacto" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="btn btn-info btn-detalle btn-sm"><i class="fas fa-address-book"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "100px",
                "className": "text-center"
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
    const textoSms = `Detalle de: ${data.Nombre}.`;
    swal("Mensaje", textoSms, "success")

});

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

    console.log(objeto);

    $("#mdData").find("div.modal-content").LoadingOverlay("show");

    setTimeout(function () {
        $("#mdData").find("div.modal-content").LoadingOverlay("hide");
        $("#mdData").modal("hide");
        //swal("Mensaje", "Todo bien sin problemas", "success")
        MostrarAlerta("¡Guardado!", "El registro se guardó correctamente.", "success");
        habilitarBoton();
    }, 4000);

})

$("#btnGuardarCambiossss").on("click", function () {
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
        url: "GradosPage.aspx/GuardarOrEditGradoAcademicos",
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
    toastr.error("No se pudo conectar con el servidor.");
    //MostrarAlertaTimer("¡Guardado automático!", "Tus respuestas se han guardado.", 3000);
})

// fin codigo