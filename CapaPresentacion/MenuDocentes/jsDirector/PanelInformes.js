
let listaTopRpt = [];
let listEstudRpt = [];
let datosKPIs = {}; // Almacenará los KPIs para el reporte

const { jsPDF } = window.jspdf;

$(document).ready(function () {
    cargarDatosGlobales();
});

function cargarDatosGlobales() {
    if (typeof usuarioGlobal !== 'undefined' && usuarioGlobal !== null) {
        // Asignar datos del director a la UI
        $("#lblInfoPropietario").text(`${usuarioGlobal.Nombres} ${usuarioGlobal.Apellidos}`);
        $("#lblInfoTienda").text(usuarioGlobal.NombreUnidadEducativa || "No registrado");
        $("#lblInfoCelular").text(usuarioGlobal.Celular || "N/A");
        $("#lblInfoCI").text(usuarioGlobal.NroCi || "N/A");
        $("#lblInfoCorreo").text(usuarioGlobal.Correo || "N/A");

        if (usuarioGlobal.Photo) {
            $("#imgPerfilDirector").attr("src", usuarioGlobal.Photo);
        }

        if (usuarioGlobal.Estado) {
            $("#lblInfoEstado").html('<i class="fas fa-check-circle mr-1"></i>ACTIVO').removeClass('badge-danger').addClass('badge-success');
        } else {
            $("#lblInfoEstado").html('<i class="fas fa-times-circle mr-1"></i>INACTIVO').removeClass('badge-success').addClass('badge-danger');
        }

        cargarDashboardCompleto();
        cargarEstudiantesUndEd(); // Cargar estudiantes para tenerlos listos en el PDF
    } else {
        MostrarAlerta("¡Alerta!", "La variable global no se encontró", "warning");
    }
}

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
                datosKPIs = datosMaster.KPIs; // Guardar para el PDF

                // Poblar las tarjetas
                $("#lblTotalTests").text(datosMaster.KPIs.TotalTests);
                $("#lblEstudiantesEvaluados").text(datosMaster.KPIs.EstudiantesEvaluados);
                $("#lblCarrerasDestacadas").text(datosMaster.KPIs.CarrerasDestacadas);
                $("#lblTotalRecomendaciones").text(datosMaster.KPIs.TotalRecomendaciones);

                listaTopRpt = datosMaster.TopRecomendaciones;
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

function cargarEstudiantesUndEd() {
    $.ajax({
        url: "PanelListaEstudiantes.aspx/ListarEstIdUndEd",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {
                listEstudRpt = response.d.Data || [];
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
        }
    });
}

$("#btnReporte").on("click", function () {
    generarReporteGeneral();
});

function generarReporteGeneral() {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const fechaActual = new Date().toLocaleDateString("es-BO");
    const undEdu = usuarioGlobal.NombreUnidadEducativa ? usuarioGlobal.NombreUnidadEducativa : "UNIDAD EDUCATIVA";

    // ==========================================
    // 1. ENCABEZADO Y LOGO
    // ==========================================
    var img = new Image();
    img.src = "/images/membrete.png";
    try {
        doc.addImage(img, 'PNG', 15, 10, 55, 25);
    } catch (e) {
        console.warn("Logo no encontrado.");
    }

    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("INFORME GENERAL DE RESULTADOS", pageWidth - 15, 20, { align: "right" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Sistema Vocacional IA", pageWidth - 15, 26, { align: "right" });
    doc.text(`Fecha de Emisión: ${fechaActual}`, pageWidth - 15, 31, { align: "right" });

    doc.setLineWidth(0.5);
    doc.line(15, 40, pageWidth - 15, 40);

    // ==========================================
    // 2. DATOS DEL DIRECTOR Y UNIDAD EDUCATIVA
    // ==========================================
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("1. DATOS DE LA INSTITUCIÓN", 15, 50);

    // --- Bloque de Dos Columnas ---
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    // Columna 1 (Izquierda - Datos Institucionales y Contacto):
    doc.text(`Unidad Educativa: ${undEdu}`, 15, 58);
    doc.text(`Celular: ${usuarioGlobal.Celular || 'No registrado'}`, 15, 64);
    doc.text(`Correo: ${usuarioGlobal.Correo || 'No registrado'}`, 15, 70);

    // Columna 2 (Derecha - Datos del Director a partir del eje X: 115):
    doc.text(`Director(a): ${usuarioGlobal.Nombres} ${usuarioGlobal.Apellidos}`, 115, 58);
    doc.text(`C.I.: ${usuarioGlobal.NroCi || 'No registrado'}`, 115, 64);

    // ==========================================
    // 3. RESUMEN ESTADÍSTICO (KPIs)
    // ==========================================
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("2. RESUMEN ESTADÍSTICO", 15, 85);

    // Usar autoTable para alinear bien los KPIs
    const kpiData = [
        ["Estudiantes Evaluados:", datosKPIs.EstudiantesEvaluados || "0", "Tests Realizados:", datosKPIs.TotalTests || "0"],
        ["Carreras Destacadas:", datosKPIs.CarrerasDestacadas || "0", "Total Recomendaciones:", datosKPIs.TotalRecomendaciones || "0"]
    ];

    doc.autoTable({
        startY: 90,
        body: kpiData,
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 45 },
            1: { cellWidth: 30 },
            2: { fontStyle: 'bold', cellWidth: 45 },
            3: { cellWidth: 30 }
        },
        margin: { left: 15 }
    });

    let currentY = doc.lastAutoTable.finalY + 15;

    // ==========================================
    // 4. TOP RECOMENDACIONES IA
    // ==========================================
    if (listaTopRpt && listaTopRpt.length > 0) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("3. TOP CARRERAS RECOMENDADAS", 15, currentY);

        const headersTop = [["#", "Carrera Universitaria", "Nivel de Afinidad (%)"]];
        const dataTop = listaTopRpt.map((item, index) => [
            index + 1,
            item.Carrera,
            `${item.Promedio}%`
        ]);

        doc.autoTable({
            startY: currentY + 5,
            head: headersTop,
            body: dataTop,
            theme: 'grid',
            headStyles: { fillColor: [23, 162, 184], textColor: 255, halign: 'center' }, // Info Cyan
            columnStyles: {
                0: { cellWidth: 15, halign: 'center' },
                1: { cellWidth: 100 },
                2: { cellWidth: 65, halign: 'center', fontStyle: 'bold' }
            },
            margin: { left: 15, right: 15 }
        });
        currentY = doc.lastAutoTable.finalY + 15;
    }

    // ==========================================
    // 5. DETALLE DE ESTUDIANTES EVALUADOS
    // ==========================================
    if (listEstudRpt && listEstudRpt.length > 0) {
        // Validar salto de página antes de imprimir el título
        if (currentY + 20 > pageHeight) {
            doc.addPage();
            currentY = 20;
        }

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("4. LISTA DE ESTUDIANTES REGISTRADOS", 15, currentY);

        const headersEst = [["#", "Estudiante", "Nro CI", "Correo"]];
        const dataEst = listEstudRpt.map((item, index) => [
            index + 1,
            item.FullName,
            item.NroCi,
            item.Correo
        ]);

        doc.autoTable({
            startY: currentY + 5,
            head: headersEst,
            body: dataEst,
            theme: 'grid',
            styles: { fontSize: 9, cellPadding: 2, valign: 'middle' },
            headStyles: { fillColor: [52, 58, 64], textColor: 255, halign: 'center' }, // Dark Gray
            columnStyles: {
                0: { cellWidth: 10, halign: 'center' },
                1: { cellWidth: 75 },
                2: { cellWidth: 40, halign: 'center' },
                3: { cellWidth: 55, halign: 'center' }
            },
            margin: { left: 15, right: 15 }
        });
    }

    // ==========================================
    // 6. FIRMA DEL DIRECTOR
    // ==========================================
    let finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : currentY;

    if (finalY + 40 > pageHeight) {
        doc.addPage();
        finalY = 20;
    }

    const firmaY = finalY + 35;
    const lineLength = 70;
    const xLineStart = (pageWidth - lineLength) / 2;
    const xLineEnd = xLineStart + lineLength;

    doc.setLineWidth(0.5);
    doc.line(xLineStart, firmaY, xLineEnd, firmaY);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`${usuarioGlobal.Nombres} ${usuarioGlobal.Apellidos}`, pageWidth / 2, firmaY + 5, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.text("Firma del Director(a)", pageWidth / 2, firmaY + 10, { align: "center" });

    // ==========================================
    // 7. PIE DE PÁGINA
    // ==========================================
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Generado por Sistema Vocacional IA - ${fechaActual}`, 15, pageHeight - 10);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth - 15, pageHeight - 10, { align: "right" });
    }

    //let d = new Date();
    //const nombreArchivo = `Informe_${undEdu.replace(/\s+/g, '_')}_${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}.pdf`;

    doc.save(`Informe_Generals_${undEdu.replace(/\s+/g, '_')}_${fechaActual.replace(/\//g, "")}.pdf`);
}
// fin