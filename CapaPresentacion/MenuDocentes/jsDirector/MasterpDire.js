
let usuarioGlobal = null;

function MostrarAlerta(titulo, mensaje, tipo) {
    // Si no se envía un tipo, por defecto será 'success'
    swal(titulo, mensaje, tipo || "success");
}


function MostrarConfirmacion(titulo, mensaje, textoConfirmar, callbackConfirmar) {
    swal({
        title: titulo,
        text: mensaje,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-warning",
        confirmButtonText: textoConfirmar || "Sí, continuar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false
    }, function () {
        if (typeof callbackConfirmar === "function") {
            callbackConfirmar();
        }
    });
}

function MostrarDecision(titulo, mensaje, textoConfirmar, textoCancelar, callbackConfirmar, callbackCancelar) {
    swal({
        title: titulo,
        text: mensaje,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: textoConfirmar || "Sí",
        cancelButtonText: textoCancelar || "No",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            if (typeof callbackConfirmar === "function") {
                callbackConfirmar();
            }
        } else {
            if (typeof callbackCancelar === "function") {
                callbackCancelar();
            }
        }
    });
}


function MostrarAlertaTimer(titulo, mensaje, timer) {
    swal({
        title: titulo,
        text: mensaje,
        type: "success",
        timer: timer || 2000,
        showConfirmButton: false
    });
}

function AlertaTimerTipo(titulo, mensaje, tipo, timer) {
    swal({
        title: titulo,
        text: mensaje,
        type: tipo,
        // Si le pasas un valor a timer lo usa; si no, usa 2000 por defecto
        timer: timer || 2000,
        showConfirmButton: false
    });
}

function MostrarToastZer(mensaje, titulo, tipo) {

    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "timeOut": "3000",
        "extendedTimeOut": "1000"
    };

    let tipoToast = tipo || "info";

    toastr[tipoToast](mensaje, titulo || "");
}

function MostrarToastFijo(mensaje, titulo) {
    toastr.error(mensaje, titulo || "Error Crítico", {
        "timeOut": "0",
        "extendedTimeOut": "0",
        "closeButton": true,
        "progressBar": false
    });
}

$(document).ready(function () {
    const usuarioAdmin = sessionStorage.getItem('usuaGen');

    if (!usuarioAdmin) {
        window.location.replace('../Login.aspx');
        return;
    }

    try {
        const usua = JSON.parse(usuarioAdmin);

        usuarioGlobal = usua;

        // mostrar la imagen y nombre del usuairo 
        $(".imgAdminVodi").attr("src", usua.Photo || "/images/sinimagen.png");

        $(".texApellidosAdmdi").text(usua.Apellidos);
        $("#lblDatosAdir").text(usua.Nombres);
        $("#rolnommeDir").text(usua.NombreUnidadEducativa);
    } catch (error) {
        console.error("Error leyendo sesión", error);
        sessionStorage.clear();
        window.location.replace('../Login.aspx');
    }
});

$('#salirsis').on('click', function (e) {
    e.preventDefault();

    MostrarConfirmacion("¿Cerrar Sesión?", "Saldrás del sistema", "Sí, salir", function () {
        // Aquí pones tu llamada AJAX o lógica de eliminación
        cerrarSesionSis();
        //MostrarAlerta("¡Eliminado!", "El archivo ha sido borrado.", "success");
    });

});

function cerrarSesionSis() {
    $.ajax({
        type: "POST",
        url: "PanelInicio.aspx/CerrarSesion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            sessionStorage.clear();
            window.location.replace('../Login.aspx');
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            sessionStorage.clear();
            window.location.replace('../Login.aspx');
        }
    });
}

function EjecutarCierreSesion() {
    sessionStorage.clear();
    window.location.replace('../Login.aspx');
}

// fin codigo