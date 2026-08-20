

// Configuramos SweetAlert para que actúe como un Toast
const ToastLogin = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

function mostrarAlerta(titulo, mensaje, icono, claseBoton = "btn btn-primary") {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        confirmButtonText: "Ok",
        buttonsStyling: false, // Esto es importante en tu plantilla para usar los botones de Bootstrap
        customClass: {
            confirmButton: claseBoton
        }
    });
}

$('#btnLogin').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnLogin').prop('disabled', true);

    if ($("#txtCorreo").val().trim() === "" || $("#txtClave").val().trim() === "") {
        ToastLogin.fire({
            icon: 'warning',
            title: 'Complete los datos para iniciar sesion'
        });
        $('#btnLogin').prop('disabled', false);
        return;
    }
    //swal("Mensaje", "Logeado exitoso", "success")

    loginSistema();
})

function loginSistema() {

    $.ajax({
        url: "Login.aspx/InicioSesion",
        type: "POST",
        data: JSON.stringify({ Correo: $("#txtCorreo").val().trim(), Clave: $("#txtClave").val().trim() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $.LoadingOverlay("show");
        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (response.d.Estado) {
                const user = response.d.Data;

                sessionStorage.clear();
                sessionStorage.setItem('usuaGen', JSON.stringify(user));

                Swal.fire({
                    title: "Bienvenido..",
                    text: `Hola ${user.Nombres} 👋`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });

                $("#txtCorreo, #txtClave").val("");

                setTimeout(() => window.location.href = response.d.Valor, 2200);

            } else {
                mostrarAlerta("¡Atención!", response.d.Mensaje, "warning", "btn btn-warning");
                //swal("Mensaje", "No se encontro el usuario", "warning")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            mostrarAlerta("Error", "Error de comunicación con el servidor.", "error", "btn btn-danger");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnLogin').prop('disabled', false);
        }
    });
}

$('#btnEnviar').on('click', function () {

    if ($("#txtReCorreo").val().trim() === "") {
        ToastLogin.fire({
            icon: 'warning',
            title: 'Debe Ingresar un Correo'
        });
        return;
    }

    $('#btnEnviar').prop('disabled', true);
    $("#mdForgotPassword").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        url: "Login.aspx/SolicitudRecuperacion",
        type: "POST",
        data: JSON.stringify({ Correo: $("#txtReCorreo").val().trim() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#mdForgotPassword").find("div.modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                mostrarAlerta("¡Excelente!", response.d.Mensaje, "success", "btn btn-primary");
                $("#mdForgotPassword").modal("hide");
                $("#txtReCorreo").val("");

            } else {
                mostrarAlerta("¡Atención!", response.d.Mensaje, "warning", "btn btn-warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#mdForgotPassword").find("div.modal-content").LoadingOverlay("hide");
            mostrarAlerta("Error", "Error de comunicación con el servidor.", "error", "btn btn-danger");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            $('#btnEnviar').prop('disabled', false);
        }
    });

})

// fin