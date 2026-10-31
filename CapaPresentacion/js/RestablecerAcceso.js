
let v_Token = "";
let v_Ruta = "";

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    const token = urlParams.get('token');
    const ruta = urlParams.get('ruta'); // 'user' o 'est'

    // 1. Validación de Enlace Inválido
    if (!email || !token || !ruta || email.trim() === "" || token.trim() === "" || ruta.trim() === "") {
        // En lugar de redirigir, mostramos la alerta infinita y ocultamos el formulario
        Swal.fire({
            icon: 'error',
            title: 'Enlace Inválido o Expirado',
            text: 'Este enlace de recuperación está corrupto o incompleto. Solicite uno nuevo.',
            showConfirmButton: false,
            allowOutsideClick: false
        });

        // Ocultamos el cuerpo de la tarjeta para que no intenten llenar nada
        $(".card-body").hide();
        return; // Detenemos la ejecución
    } else {
        v_Token = token;
        v_Ruta = ruta;
        $("#txtCorreo").val(email);

        // Opcional: Ocultar el botón "Volver al Login" si es un estudiante en celular
        if (v_Ruta === "est") {
            $("#btnVolverLogin").hide(); // Asegúrate de ponerle este ID a tu enlace "Volver al Login"
        }
    }

    // 2. Ver/Ocultar Contraseñas
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

    // 3. Validar Seguridad al Escribir
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

function habilitarBoton() {
    $('#btnActualizarPass').prop('disabled', false);
}

// 4. Envío Dinámico del Formulario
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

    // Definimos la URL de destino dinámicamente según la ruta
    let urlDestino = (v_Ruta === "est")
        ? "RestablecerAcceso.aspx/RestablecerPasswordEst"
        : "RestablecerAcceso.aspx/RestablecerPassword";

    $.ajax({
        type: "POST",
        url: urlDestino,
        data: JSON.stringify({ correo: correoForm, token: v_Token, passNueva: nueva }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#cardContainer").LoadingOverlay("hide");

            if (response.d.Estado) {

                // LÓGICA DIFERENCIADA EN CASO DE ÉXITO
                if (v_Ruta === "est") {
                    Swal.fire({
                        icon: 'success',
                        title: "¡Contraseña Restablecida!",
                        text: "Su nueva contraseña se ha guardado correctamente. Ya puede cerrar esta ventana e iniciar sesión desde la Aplicación Móvil.",
                        showConfirmButton: false,
                        allowOutsideClick: false
                    });
                    $(".card-body").hide(); // Ocultamos para que no envíen de nuevo
                }
                else {
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
                }

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
            // Solo rehabilitamos si no hay un mensaje de éxito permanente en pantalla
            if ($(".swal2-success").length === 0) {
                habilitarBoton();
            }
        }
    });
});

// fin