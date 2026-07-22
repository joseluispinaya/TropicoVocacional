
// VARIABLES GLOBALES EN MEMORIA
let tablaData;
let tablaDataHis;
let tablaDetallesHi;

$(document).ready(function () {

    // 1. CONFIGURACIÓN DEL SELECT2 (Buscador de Docentes)
    $("#cboBuscarEstudian").select2({
        placeholder: "Escriba el nombre, apellido o CI estudiante...",
        allowClear: true,
        ajax: {
            url: "PanelEstudiantes.aspx/BuscarEstudianteSelect2",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            delay: 300, // Espera 300ms después de que el usuario deja de escribir
            data: function (params) {
                return JSON.stringify({ busqueda: params.term || "" });
            },
            processResults: function (data) {
                var items = data.d.Data || [];
                return {
                    results: $.map(items, function (item) {
                        return {
                            id: item.IdEstudiante,
                            text: item.NroCi + ' - ' + item.FullName,
                            // Guardamos datos extra para usarlos al seleccionar
                            imgUrl: item.Photo,
                            ci: item.NroCi,
                            nombres: item.FullName
                        }
                    })
                };
            },
            cache: true
        }
    });

    // EVENTO: Al seleccionar un docente del Select2
    $('#cboBuscarEstudian').on('select2:select', function (e) {
        var data = e.params.data;

        // Asignamos el ID al input oculto
        $("#txtIdEstudiante").val(data.id);

        // Actualizamos la tarjeta de presentación "EST: " + data.nombres
        $("#lblNombres").text("EST: " + data.nombres);
        $("#lblDatos").text("Nro de CI: " + data.ci).removeClass("badge-secondary").addClass("badge-info");

        // Actualizamos la foto (si no tiene, mantiene la por defecto)
        let imagenBase = data.imgUrl ? data.imgUrl : "../images/sinimagen.png";
        $("#imgEstde").attr("src", imagenBase);

        listaHistorialEst(data.id);
    });

    // EVENTO: Al limpiar el Select2
    $('#cboBuscarEstudian').on('select2:unselect', function (e) {
        $("#txtIdEstudiante").val("0");
        $("#lblNombres").text("Esperando..");
        $("#lblDatos").text("Seleccione un estudiante").removeClass("badge-info").addClass("badge-secondary");
        $("#imgEstde").attr("src", "../images/sinimagen.png");

        //$("#seccionDetalle").hide();

        if ($.fn.DataTable.isDataTable("#tbDataHist")) {
            $("#tbDataHist").DataTable().clear().draw();
        }

        $("#lblMateriaSelect").text("Esperando...");
        //$("#btnReporte").prop("disabled", true);
    });

}); // Fin document.ready

function listaHistorialEst(idEstudiante) {
    if ($.fn.DataTable.isDataTable("#tbDataHist")) {
        $("#tbDataHist").DataTable().destroy();
        $('#tbDataHist tbody').empty();
    }

    var request = {
        IdEstudiante: parseInt(idEstudiante)
    };

    tablaDataHis = $("#tbDataHist").DataTable({
        responsive: true,
        searching: false,
        info: false,
        "ajax": {
            "url": '/PageEstudiantes.aspx/HistorialTestEst',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
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
            { "data": "IdTest", "visible": false, "searchable": false },
            {
                "data": "ObservacionGeneralIA",
                "className": "text-wrap text-muted align-middle",
                "render": function (data) {
                    // Texto en cursiva con icono de comillas
                    return `<div><i class="fas fa-quote-left fa-fw text-secondary mr-1"></i> <em>${data}</em></div>`;
                }
            },
            {
                "defaultContent": '<button class="btn btn-success btn-ver btn-sm"><i class="fas fa-eye"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "50px",
                "className": "text-center align-middle"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#tbDataHist tbody').on('click', '.btn-ver', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaDataHis.row(fila).data();
    //const textoSms = $("#lblNombreEsr").text();
    detalleHistorialEst(data.IdTest);
    //$("#myModalLabeldett").text(textoSms);
    $("#mdDetalles").modal("show");
    //swal("Mensaje", textoSms, "info")

});

function detalleHistorialEst(idTest) {
    if ($.fn.DataTable.isDataTable("#tbDetalleHistor")) {
        $("#tbDetalleHistor").DataTable().destroy();
        $('#tbDetalleHistor tbody').empty();
    }

    var request = {
        IdTest: parseInt(idTest)
    };

    tablaDetallesHi = $("#tbDetalleHistor").DataTable({
        responsive: true,
        autoWidth: false,
        // Como son máximo 3 carreras, ocultamos controles para que se vea como un "Widget" limpio
        paging: false,
        searching: false,
        info: false,
        "ajax": {
            "url": '/PageEstudiantes.aspx/DetalleHistorialTest',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
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
            {
                "data": "Carrera",
                "width": "25%",
                "className": "align-middle",
                "render": function (data) {
                    // Diseño hermoso: Icono de graduación en círculo + Nombre de carrera
                    return `
                        <div class="d-flex align-items-center">
                            <div class="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white mr-3" style="width: 40px; height: 40px; min-width: 40px;">
                                <i class="fas fa-user-graduate" style="font-size: 1.1rem;"></i>
                            </div>
                            <div style="line-height: 1.2;">
                                <div class="font-weight-bold text-dark" style="font-size: 13px;">${data}</div>
                                <small class="text-muted">Carrera Sugerida</small>
                            </div>
                        </div>
                    `;
                }
            },
            {
                "data": "Justificacion",
                "width": "50%",
                "className": "text-wrap text-muted align-middle",
                "render": function (data) {
                    // Texto en cursiva con icono de comillas
                    return `<div><i class="fas fa-quote-left fa-fw text-secondary mr-1"></i> <em>${data}</em></div>`;
                }
            },
            {
                "data": "Puntaje",
                "width": "25%",
                "className": "align-middle",
                "render": function (data) {
                    // Redondeamos el puntaje (ej. 95.5 -> 96)
                    let puntaje = Math.round(data);

                    // Lógica de colores adaptada a las clases de TU plantilla
                    let colorClass = "progress-bar-success"; // Verde para alta afinidad (>= 80)
                    if (puntaje < 86) colorClass = "progress-bar-warning"; // 80 origi Amarillo para media (60 a 79)
                    if (puntaje < 60) colorClass = "progress-bar-danger"; // Rojo para baja (< 60)

                    // Barra de progreso de tu template
                    return `
                        <div class="text-left mb-1 font-weight-bold" style="font-size: 12px; color: #555;">
                            Afinidad IA: <span class="float-right">${puntaje}%</span>
                        </div>
                        <div class="progress" style="height: 12px;">
                            <div class="progress-bar ${colorClass} progress-bar-striped" role="progressbar" aria-valuenow="${puntaje}" aria-valuemin="0" aria-valuemax="100" style="width: ${puntaje}%">
                            </div>
                        </div>
                    `;
                }
            }
        ],
        // Mantenemos el orden por la columna 2 (Puntaje) descendente
        "order": [[2, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

// fin