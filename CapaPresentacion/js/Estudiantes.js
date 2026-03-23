
let tablaData;
let idEditar = 0;



$("#btnNuevo").on("click", function () {

    idEditar = 0;
    $("#txtnombres").val("");
    $("#txtapellidos").val("");
    $("#cboUnidadEd").val("").trigger('change');
    $("#txtNroci").val("");
    $("#txtCorreo").val("");
    $("#cboEstado").val(1);
    $("#cboEstado").prop("disabled", true);

    $("#myModalLabel").text("Nuevo Registro");

    $("#mdData").modal("show");

})
// fin