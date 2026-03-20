
function MostrarAlerta(titulo, mensaje, tipo) {
    // Si no se envía un tipo, por defecto será 'success'
    swal(titulo, mensaje, tipo || "success");
}

// Ejemplo de uso:
// MostrarAlerta("¡Guardado!", "El registro se guardó correctamente.", "success");

function MostrarConfirmacion(titulo, mensaje, textoConfirmar, callbackConfirmar) {
    swal({
        title: titulo,
        text: mensaje,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-warning",
        confirmButtonText: textoConfirmar || "Sí, continuar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false // Mantiene la alerta abierta para mostrar otra encima si es necesario
    }, function () {
        // Ejecuta la lógica que enviaste como parámetro
        if (typeof callbackConfirmar === "function") {
            callbackConfirmar();
        }
    });
}

// Ejemplo de uso:
// MostrarConfirmacion("¿Eliminar registro?", "Esta acción no se puede deshacer.", "Sí, eliminar", function() {
//     // Aquí pones tu llamada AJAX o lógica de eliminación
//     MostrarAlerta("¡Eliminado!", "El archivo ha sido borrado.", "success");
// });
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

// Ejemplo de uso:
// MostrarDecision("¿Desea enviar los datos?", "Se registrará en la base de datos.", "Sí, enviar", "No, revisar",
//     function() {
//         MostrarAlerta("¡Enviado!", "Datos guardados.", "success");
//     },
//     function() {
//         MostrarAlerta("Cancelado", "Puedes seguir editando.", "error");
//     }
// );

function MostrarAlertaTimer(titulo, mensaje, timer) {
    swal({
        title: titulo,
        text: mensaje,
        // Si le pasas un valor a timer lo usa; si no, usa 2000 por defecto
        timer: timer || 2000,
        showConfirmButton: false
    });
}
//MostrarAlertaTimer("¡Guardado automático!", "Tus respuestas se han guardado.", 3000);
//MostrarAlertaTimer("Cargando...", "Preparando tu test vocacional.");

// fin codigo