
let tablaData;
let idEditar = 0;


$("#btnRegistro").on("click", function () {

    idEditar = 0;
    $("#txtTitulo").val("");
    $("#txtDescripcion").val("");

    $("#myModalLabel").text("Nuevo Registro");

    $("#mdData").modal("show");

})
// fin