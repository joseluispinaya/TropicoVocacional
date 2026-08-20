
let v_Token = "";

$(document).ready(function () {
    // 1. Obtener parámetros de la URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    const token = urlParams.get('token');

    // 2. Validación de Enlace Inválido
    if (!email || !token || email.trim() === "" || token.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Enlace Inválido',
            text: 'Este enlace de recuperación está corrupto o incompleto.',
            timer: 4000,
            showConfirmButton: false,
            allowOutsideClick: false
        }).then(() => {
            redirigirA('Login.aspx', 0);
        });
    } else {
        v_Token = token;
        console.log(v_Token);
        $("#txtCorreo").val(email); // Llenar el campo readonly
    }

    // 3. Ver/Ocultar Contraseñas
    $('.pwd-toggle').on('click', function () {
        let input = $(this).closest('.input-group').find('.pwd-input');
        let icon = $(this).find('i');

        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    // 4. Validar Seguridad al Escribir
    $('#txtPassNueva, #txtPassConfirma').on('keyup', function () {
        validarSeguridadPassword();
    });
});

function redirigirA(url, delay = 3000) {
    setTimeout(() => window.location.href = url, delay);
}

function validarSeguridadPassword() {
    let pwd = $("#txtPassNueva").val();
    let pwdConf = $("#txtPassConfirma").val();
    let btnSubmit = $("#btnActualizarPass");

    // Reglas
    let hasLength = pwd.length >= 8;
    let hasMayus = /[A-Z]/.test(pwd);
    let hasNum = /[0-9]/.test(pwd);

    // Actualizar iconos
    actualizarIconoRegla("#reqLength", hasLength);
    actualizarIconoRegla("#reqMayus", hasMayus);
    actualizarIconoRegla("#reqNum", hasNum);

    // Fuerza
    let fuerza = 0;
    if (hasLength) fuerza += 34;
    if (hasMayus) fuerza += 33;
    if (hasNum) fuerza += 33;

    let bar = $("#pwdStrengthBar");
    let text = $("#pwdStrengthText");

    bar.css("width", fuerza + "%").removeClass("bg-danger bg-warning bg-success");

    if (fuerza === 0) {
        text.text("Seguridad");
    } else if (fuerza < 50) {
        bar.addClass("bg-danger");
        text.text("Débil").addClass("text-danger").removeClass("text-warning text-success");
    } else if (fuerza < 100) {
        bar.addClass("bg-warning");
        text.text("Media").addClass("text-warning").removeClass("text-danger text-success");
    } else {
        bar.addClass("bg-success");
        text.text("Fuerte").addClass("text-success").removeClass("text-danger text-warning");
    }

    // Coincidencia
    let coinciden = (pwd === pwdConf && pwd.length > 0);
    if (pwdConf.length > 0 && !coinciden) {
        $("#pwdMatchText").removeClass("d-none");
    } else {
        $("#pwdMatchText").addClass("d-none");
    }

    // Habilitar botón solo si es fuerte y coincide
    if (fuerza === 100 && coinciden) {
        btnSubmit.prop("disabled", false);
    } else {
        btnSubmit.prop("disabled", true);
    }
}

function actualizarIconoRegla(idElemento, cumple) {
    let icon = $(idElemento);
    if (cumple) {
        icon.removeClass("fa-times text-danger").addClass("fa-check text-success");
    } else {
        icon.removeClass("fa-check text-success").addClass("fa-times text-danger");
    }
}

// 5. Envío de Formulario
$("#btnActualizarPass").on("click", function () {
    let nueva = $("#txtPassNueva").val();
    let correoForm = $("#txtCorreo").val().trim();

    $('#btnActualizarPass').prop('disabled', true);
    $("#cardContainer").LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-circle-notch fa-spin",
        size: 10,
        text: "Procesando..."
    });

    $.ajax({
        type: "POST",
        url: "RestablecerAcceso.aspx/RestablecerPassword",
        data: JSON.stringify({ correo: correoForm, token: v_Token, passNueva: nueva }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#cardContainer").LoadingOverlay("hide");

            if (response.d.Estado) {
                Swal.fire({
                    icon: 'success',
                    title: "¡Contraseña Restablecida!",
                    text: "Por seguridad, será redirigido al inicio de sesión.",
                    timer: 3000,
                    showConfirmButton: false,
                    allowOutsideClick: false
                }).then(() => {
                    redirigirA('Login.aspx', 0);
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Atención',
                    text: response.d.Mensaje
                });
            }
        },
        error: function () {
            $("#cardContainer").LoadingOverlay("hide");
            Swal.fire({
                icon: 'error',
                title: 'Error de Comunicación',
                text: 'No se pudo conectar con el servidor. Intente nuevamente.'
            });
        },
        complete: function () {
            // Solo lo habilitamos de nuevo si no fue exitoso, 
            // si fue exitoso, ya estamos redirigiendo.
            if ($(".swal2-success").length === 0) {
                $('#btnActualizarPass').prop('disabled', false);
            }
        }
    });
});

// fin