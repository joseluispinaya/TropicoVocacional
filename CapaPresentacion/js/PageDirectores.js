
let tablaData;
let idEditar = 0;

function esImagen(file) {
    return file && file.type.startsWith("image/");
}

function mostrarImagenSeleccionada(input) {
    let file = input.files[0];
    let reader = new FileReader();

    // Si NO se seleccionó archivo (ej: presionaron "Cancelar")
    if (!file) {
        $('#imgDirectReg').attr('src', "images/sinimagen.png");
        $(input).next('.custom-file-label').text('Ningún archivo seleccionado');
        return;
    }

    // Validación: si no es imagen, mostramos error
    if (!esImagen(file)) {
        toastr.error("El archivo seleccionado no es una imagen válida.");
        $('#imgDirectReg').attr('src', "images/sinimagen.png");
        $(input).next('.custom-file-label').text('Ningún archivo seleccionado');
        input.value = ""; // Limpia el input de archivo
        return;
    }

    // Si todo es válido → mostrar vista previa
    reader.onload = (e) => $('#imgDirectReg').attr('src', e.target.result);
    reader.readAsDataURL(file);

    // Mostrar nombre del archivo
    $(input).next('.custom-file-label').text(file.name);
}

$('#txtFotoUr').change(function () {
    mostrarImagenSeleccionada(this);
});

$("#btnRegistro").on("click", function () {

    idEditar = 0;
    $("#txtNombres").val("");
    $("#txtApellidos").val("");
    $("#txtCorreo").val("");
    $("#txtCelular").val("");
    $("#txtNroci").val("");
    $("#cboEstado").val(1);
    $("#cboEstado").prop("disabled", true);

    $('#imgDirectReg').attr('src', "images/sinimagen.png");
    $("#txtFotoUr").val("");
    $(".custom-file-label").text('Ningún archivo seleccionado');

    $("#myModalLabel").text("Nuevo Registro");

    $("#mdData").modal("show");

})
// fin