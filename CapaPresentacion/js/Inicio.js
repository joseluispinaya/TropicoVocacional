
$(document).ready(function () {
    // Inicializar los datos gráficos
    datosEstadisticoshardcodeado();
});

function datosEstadisticoshardcodeado() {

    // -------------------------------------------------------
    // 1. Gráfico de Dona (Resultados por área)
    // -------------------------------------------------------
    var ctxDona = document.getElementById('resultadosAreaChart').getContext('2d');
    var resultadosAreaChart = new Chart(ctxDona, {
        type: 'doughnut',
        data: {
            //labels: ['Ciencias Sociales', 'Ciencias Naturales', 'Tecnología', 'Arte y Diseño'],
            labels: ['Aptitudes', 'Personalidad', 'Intereses', 'Habilidades'],
            datasets: [{
                data: [35, 28, 20, 17],
                backgroundColor: [
                    '#3292e0', // Primary (Azul)
                    '#5cb45b', // Success (Verde)
                    '#04a2b3', // Info (Celeste)
                    '#f7b543'  // Warning (Naranja)
                ],
                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%', // Grosor de la dona
            plugins: {
                legend: {
                    position: 'right', // Posiciona la leyenda a la derecha como en tu imagen
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            family: "'Roboto', sans-serif",
                            size: 13
                        }
                    }
                }
            }
        }
    });

    // -------------------------------------------------------
    // 2. Gráfico de Barras (Distribución de resultados)
    // -------------------------------------------------------
    var ctxBarras = document.getElementById('distribucionResultadosChart').getContext('2d');
    var distribucionResultadosChart = new Chart(ctxBarras, {
        type: 'bar',
        data: {
            labels: ['Alto', 'Medio', 'Bajo'],
            datasets: [{
                label: 'Resultados',
                data: [700, 580, 340],
                backgroundColor: '#3292e0', // Color azul primario del theme Webadmin
                borderRadius: 4, // Bordes ligeramente redondeados
                barThickness: 40 // Ancho de las barras
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Ocultamos la leyenda superior porque solo hay una serie
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 800, // Ajuste del límite Y para que se parezca a la imagen
                    ticks: {
                        stepSize: 200
                    },
                    grid: {
                        borderDash: [3, 3] // Líneas de guía punteadas
                    }
                },
                x: {
                    grid: {
                        display: false // Oculta las líneas verticales de fondo
                    }
                }
            }
        }
    });
}

// fin de datosEstadisticoshardcodeado()