

$(document).ready(function () {
    // 1. Cargar datos al iniciar
    cargarDatosUsuario();

    // 2. Evento para previsualizar foto
    $('#txtFotoUr').change(function () {
        mostrarImagenSeleccionada(this);
    });

    // 3. Lógica del Ojito para ver/ocultar contraseñas
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

    // 4. Medidor de Fuerza de Contraseña Dinámico
    $('#txtPassNueva, #txtPassConfirma').on('keyup', function () {
        validarSeguridadPassword();
    });
});

function cargarDatosUsuario() {
    $("#cargando").LoadingOverlay("show", {
        image: "",
        fontawesome: "fas fa-circle-notch fa-spin",
        size: 10,
        text: "Cargando perfil..."
    });

    setTimeout(function () {
        $("#cargando").LoadingOverlay("hide");

        if (typeof usuarioGlobal !== 'undefined' && usuarioGlobal !== null) {
            // Llenar datos personales
            $("#txtNombres").val(usuarioGlobal.Nombres);
            $("#txtApellidos").val(usuarioGlobal.Apellidos);
            $("#txtNroci").val(usuarioGlobal.NroCi);
            $("#txtCelular").val(usuarioGlobal.Celular);
            $("#txtCorreo").val(usuarioGlobal.Correo);

            // Readonly
            $("#txtUnidadEducativa").val(usuarioGlobal.NombreUnidadEducativa || "Sin Asignar");

            // Foto
            if (usuarioGlobal.Photo) {
                $("#imgDirectReg").attr("src", usuarioGlobal.Photo);
            }
        } else {
            toastr.error("No se pudo cargar la información del usuario.", "Error");
        }
    }, 800); // 800ms es mejor UX que 3000ms para datos que ya están en memoria
}

function esImagen(file) {
    return file && file.type.startsWith("image/");
}

function mostrarImagenSeleccionada(input) {
    let file = input.files[0];
    let reader = new FileReader();

    if (!file) {
        // Restaurar a la foto actual si cancela
        let srcOriginal = usuarioGlobal.Photo ? usuarioGlobal.Photo : "../images/sinimagen.png";
        $('#imgDirectReg').attr('src', srcOriginal);
        $(input).next('.custom-file-label').text('Cambiar foto...');
        return;
    }

    if (!esImagen(file)) {
        toastr.warning("El archivo seleccionado no es una imagen válida.");
        input.value = "";
        return;
    }

    reader.onload = (e) => $('#imgDirectReg').attr('src', e.target.result);
    reader.readAsDataURL(file);
    $(input).next('.custom-file-label').text(file.name);
}

function validarSeguridadPassword() {
    let pwd = $("#txtPassNueva").val();
    let pwdConf = $("#txtPassConfirma").val();
    let btnSubmit = $("#btnActualizarPass");

    // Reglas
    let hasLength = pwd.length >= 8;
    let hasMayus = /[A-Z]/.test(pwd);
    let hasNum = /[0-9]/.test(pwd);

    // Actualizar iconos de reglas
    actualizarIconoRegla("#reqLength", hasLength);
    actualizarIconoRegla("#reqMayus", hasMayus);
    actualizarIconoRegla("#reqNum", hasNum);

    // Calcular fuerza
    let fuerza = 0;
    if (hasLength) fuerza += 34;
    if (hasMayus) fuerza += 33;
    if (hasNum) fuerza += 33;

    let bar = $("#pwdStrengthBar");
    let text = $("#pwdStrengthText");

    bar.css("width", fuerza + "%");
    bar.removeClass("bg-danger bg-warning bg-success");

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

    // Validar coincidencia
    let coinciden = (pwd === pwdConf && pwd.length > 0);
    if (pwdConf.length > 0 && !coinciden) {
        $("#pwdMatchText").removeClass("d-none");
    } else {
        $("#pwdMatchText").addClass("d-none");
    }

    // Habilitar botón solo si todo es correcto y metió la actual
    if (fuerza === 100 && coinciden && $("#txtPassActual").val().trim() !== "") {
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

function habilitarBotonAct() {
    $('#btnGuardarPerfil').prop('disabled', false);
}

$("#btnGuardarPerfil").on("click", function () {

    $('#btnGuardarPerfil').prop('disabled', true);

    let nombres = $("#txtNombres").val().trim();
    let apellidos = $("#txtApellidos").val().trim();
    let nroCi = $("#txtNroci").val().trim();
    let celular = $("#txtCelular").val().trim();
    let correo = $("#txtCorreo").val().trim();

    if (nombres === "" || apellidos === "" || nroCi === "" || correo === "") {
        MostrarToastZer("Por favor complete los campos obligatorios.", "Atención", "warning");
        habilitarBotonAct();
        return;
    }

    let objDirector = {
        Nombres: nombres,
        Apellidos: apellidos,
        NroCi: nroCi,
        Celular: celular,
        Correo: correo
    };

    // Procesar la foto seleccionada
    let fileInput = document.getElementById('txtFotoUr');
    let file = fileInput.files[0];
    let base64String = "";

    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            base64String = e.target.result.split(',')[1]; // Remover el encabezado data:image/png;base64,
            enviarCambiosPerfil(objDirector, base64String);
        };
        reader.readAsDataURL(file);
    } else {
        enviarCambiosPerfil(objDirector, base64String);
    }
});

function enviarCambiosPerfil(objDirector, base64Image) {
    $("#cargando").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "PerfilUser.aspx/GuardarCambiosPerfil",
        data: JSON.stringify({ objeto: objDirector, base64Image: base64Image }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#cargando").LoadingOverlay("hide");

            if (response.d.Estado) {
                MostrarToastZer(response.d.Mensaje, "Éxito", response.d.Valor);

                // Sobrescribir la memoria local con los nuevos datos devueltos por C#
                usuarioGlobal = response.d.Data;
                sessionStorage.setItem('usuaGen', JSON.stringify(usuarioGlobal));

                // Limpiar el input de la foto
                $("#txtFotoUr").val("");
                $(".custom-file-label").text('Cambiar foto...');

            } else {
                MostrarToastZer(response.d.Mensaje, "Atención", response.d.Valor);
            }
        },
        error: function (xhr) {
            $("#cargando").LoadingOverlay("hide");
            MostrarToastZer("Error de comunicación con el servidor.", "Error", "error");
        },
        complete: function () {
            habilitarBotonAct();
        }
    });
}

$("#btnActualizarPass").on("click", function () {

    let actual = $("#txtPassActual").val();
    let nueva = $("#txtPassNueva").val();

    // 1. Validar que la nueva contraseña sea diferente a la actual
    if (actual === nueva) {
        MostrarToastZer("La nueva contraseña debe ser diferente a su contraseña actual.", "Atención", "warning");
        return; // Detenemos la ejecución aquí
    }

    // 2. Bloquear la UI para evitar doble envío
    $("#cargando").LoadingOverlay("show");
    $('#btnActualizarPass').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "PerfilUser.aspx/ActualizarPassword",
        data: JSON.stringify({ passActual: actual, passNueva: nueva }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#cargando").LoadingOverlay("hide");

            if (response.d.Estado) {
                // Si tuvo éxito, mostramos mensaje y lo sacamos
                swal({
                    title: "¡Accion Realizada con Éxito!",
                    text: "Su contraseña ha sido cambiada. Por favor inicie sesión nuevamente.",
                    timer: 2000,
                    showConfirmButton: false
                });

                setTimeout(function () {
                    cerrarSesionSis(); // Usamos tu función para enviarlo al login
                }, 2000);
            } else {
                MostrarToastZer(response.d.Mensaje, "Atención", response.d.Valor);
            }
        },
        error: function () {
            $("#cargando").LoadingOverlay("hide");
            MostrarToastZer("Error de comunicación", "Error", "error");
        },
        complete: function () {
            $('#btnActualizarPass').prop('disabled', false);
        }
    });
});


// fin