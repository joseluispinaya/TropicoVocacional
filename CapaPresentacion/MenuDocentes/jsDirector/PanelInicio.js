

// Variables globales para destruir instancias previas de Chart.js y evitar superposiciones
let instanciaChartDona = null;
let instanciaChartBarras = null;

$(document).ready(function () {
    cargarDashboardCompleto();
});

function cargarDashboardCompleto() {
    $.ajax({
        type: "POST",
        url: "PanelInicio.aspx/ObtenerEstadisticasDashboard",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                let datosMaster = response.d.Data;

                // 1. Actualizar KPIs (Tarjetas Superiores)
                $("#lblTotalTests").text(datosMaster.KPIs.TotalTests);
                $("#lblEstudiantesEvaluados").text(datosMaster.KPIs.EstudiantesEvaluados);
                $("#lblCarrerasDestacadas").text(datosMaster.KPIs.CarrerasDestacadas);
                $("#lblTotalRecomendaciones").text(datosMaster.KPIs.TotalRecomendaciones);

                // 2. Inicializar Gráficos y Barras de Progreso
                inicializarGraficoDona(datosMaster.GraficoDona);
                inicializarGraficoBarras(datosMaster.GraficoBarras);
                renderizarTopRecomendaciones(datosMaster.TopRecomendaciones);

            } else {
                MostrarToastZer(response.d.Mensaje, "Atención", "warning");
            }
        },
        error: function (xhr) {
            console.error(xhr.responseText);
            MostrarToastZer("Error de comunicación con el servidor.", "Error", "error");
        }
    });
}

function inicializarGraficoDona(listaCarreras) {
    if (instanciaChartDona) {
        instanciaChartDona.destroy();
    }

    // Extraer etiquetas y valores iterando la lista que viene de C#
    let labelsGrafico = listaCarreras.map(c => c.Carrera);
    let dataGrafico = listaCarreras.map(c => c.Cantidad);

    let ctxDona = document.getElementById('resultadosAreaChart').getContext('2d');
    instanciaChartDona = new Chart(ctxDona, {
        type: 'doughnut',
        data: {
            labels: labelsGrafico,
            datasets: [{
                data: dataGrafico,
                backgroundColor: ['#3292e0', '#5cb45b', '#f7b543', '#e866ff'], // Primary, Success, Warning, Pink
                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: { family: "'Roboto', sans-serif", size: 13 }
                    }
                }
            }
        }
    });
}

function inicializarGraficoBarras(datosBarras) {
    if (instanciaChartBarras) {
        instanciaChartBarras.destroy();
    }

    let ctxBarras = document.getElementById('distribucionResultadosChart').getContext('2d');
    instanciaChartBarras = new Chart(ctxBarras, {
        type: 'bar',
        data: {
            labels: ['Alto (≥80)', 'Medio (50-79)', 'Bajo (<50)'],
            datasets: [{
                label: 'Cantidad de Recomendaciones',
                // Mapeamos las propiedades del DTO EDistribucion
                data: [datosBarras.Alto, datosBarras.Medio, datosBarras.Bajo],
                backgroundColor: ['#5cb45b', '#f7b543', '#f03154'], // Verde para Alto, Naranja para Medio, Rojo para Bajo
                borderRadius: 4,
                barThickness: 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }, // Cambiado a 1 para que cuente enteros reales
                    grid: { borderDash: [3, 3] }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function renderizarTopRecomendaciones(listaTop) {
    let contenedor = $("#contenedorTopRecomendaciones");
    contenedor.empty(); // Limpiamos el spinner de carga

    if (listaTop.length === 0) {
        contenedor.html('<div class="alert alert-info">Aún no hay recomendaciones generadas.</div>');
        return;
    }

    let htmlGenerado = "";
    // Clases de Webadmin para alternar colores
    const arrayColores = ['primary', 'success', 'warning', 'pink'];

    $.each(listaTop, function (index, item) {
        let colorTheme = arrayColores[index % arrayColores.length]; // Alterna los colores cíclicamente

        // Plantilla HTML basada en el ejemplo de Webadmin
        htmlGenerado += `
            <p class="font-600 m-b-5">${item.Carrera} <span class="text-dark float-right"><b>${item.Promedio}%</b></span></p>
            <div class="progress m-b-20 progress-md">
                <div class="progress-bar progress-bar-${colorTheme} progress-bar-striped progress-bar-animated" 
                     role="progressbar" 
                     aria-valuenow="${item.Promedio}" 
                     aria-valuemin="0" 
                     aria-valuemax="100" 
                     style="width: ${item.Promedio}%">
                    <span class="sr-only">${item.Promedio}% Complete</span>
                </div>
            </div>
        `;
    });

    contenedor.append(htmlGenerado);
}

// fin de datosEstadisticoshardcodeado()