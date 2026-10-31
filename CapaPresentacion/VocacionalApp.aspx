<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="VocacionalApp.aspx.cs" Inherits="CapaPresentacion.VocacionalApp" %>

<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vocacional App - Descarga Oficial</title>

    <link rel="shortcut icon" href="images/faviconaa.ico">
    
    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    
    <style>
        :root {
            --primary: #442484;
            --secondary: #a17dc3;
            --bg-light: #f8f9fa;
        }
        body {
            background-color: var(--bg-light);
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #222;
        }
        .hero-section {
            background: linear-gradient(135deg, var(--primary) 0%, #2a1558 100%);
            color: white;
            padding: 40px 20px 30px;
            text-align: center;
            border-bottom-left-radius: 30px;
            border-bottom-right-radius: 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .app-logo {
            width: 120px;
            height: 120px;
            margin-bottom: 20px;
            object-fit: cover;
        }
        .app-title {
            font-weight: 800;
            font-size: 2rem;
            margin-bottom: 10px;
        }
        .app-subtitle {
            font-size: 1rem;
            opacity: 0.9;
            margin-bottom: 20px;
        }
        .features-section {
            padding: 20px 20px;
        }
        .feature-item {
            display: flex;
            align-items: center;
            background: white;
            padding: 15px;
            border-radius: 12px;
            margin-bottom: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .feature-icon {
            color: var(--primary);
            font-size: 24px;
            width: 40px;
            text-align: center;
            margin-right: 15px;
        }
        .screenshots-section {
            padding: 0px 20px;
            text-align: center;
        }
        .screenshots-scroll {
            display: flex;
            overflow-x: auto;
            gap: 15px;
            padding-bottom: 15px;
            scrollbar-width: none; /* Firefox */
        }
        .screenshots-scroll::-webkit-scrollbar {
            display: none; /* Chrome/Safari */
        }
        .screenshot-img {
            width: auto;
            height: 400px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.15);
            border: 4px solid white;
        }
        /* Botón flotante para móviles */
        .btn-download-container {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 400px;
            z-index: 1000;
        }
        .btn-download {
            background-color: var(--primary);
            color: white;
            font-weight: bold;
            font-size: 1.1rem;
            padding: 15px 20px;
            border-radius: 30px;
            width: 100%;
            border: none;
            box-shadow: 0 8px 20px rgba(68, 36, 132, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: transform 0.2s;
        }
        .btn-download:active {
            transform: translateY(2px);
        }
        /* Espaciador inferior para no tapar contenido con el botón flotante */
        .bottom-spacer {
            height: 100px;
        }
    </style>
</head>
<body>

    <!-- HERO SECTION -->
    <div class="hero-section">
        <!-- Logo de la aplicación -->
        <img src="images/infoswal.png" alt="Vocacional App Logo" class="app-logo">
        <h1 class="app-title">Vocacional App</h1>
        <p class="app-subtitle">Descubre tu futuro profesional con Inteligencia Artificial. Realiza tests, analiza tus aptitudes y encuentra tu carrera ideal.</p>
    </div>

    <!-- CARACTERÍSTICAS -->
    <div class="container features-section">
        <h5 class="fw-bold mb-3" style="color: var(--primary);">¿Qué incluye la app?</h5>
        
        <div class="feature-item">
            <div class="feature-icon"><i class="fa-solid fa-brain"></i></div>
            <div>
                <strong class="d-block">Análisis con IA</strong>
                <span class="text-muted" style="font-size: 0.9rem;">Recomendaciones basadas en tus respuestas.</span>
            </div>
        </div>
        
        <div class="feature-item">
            <div class="feature-icon"><i class="fa-solid fa-file-pdf"></i></div>
            <div>
                <strong class="d-block">Reportes en PDF</strong>
                <span class="text-muted" style="font-size: 0.9rem;">Exporta tus resultados vocacionales al instante.</span>
            </div>
        </div>
        
        <div class="feature-item">
            <div class="feature-icon"><i class="fa-solid fa-clock-rotate-left"></i></div>
            <div>
                <strong class="d-block">Historial de Test</strong>
                <span class="text-muted" style="font-size: 0.9rem;">Tus datos y test guardados en la nube.</span>
            </div>
        </div>
    </div>

    <!-- CAPTURAS DE PANTALLA ## -->
    <div class="screenshots-section">
        <h5 class="fw-bold mb-3 text-start px-2" style="color: var(--primary);">Nuestra App</h5>
        <div class="screenshots-scroll">
            <img src="images/capturavo.jpg" alt="Pantalla de Registro" class="screenshot-img">
            <img src="images/capturavo2.jpg" alt="Pantalla de Inicio" class="screenshot-img" onerror="this.style.display='none'">
            <img src="images/capturavo3.jpg" alt="Pantalla de Resultados" class="screenshot-img" onerror="this.style.display='none'">
        </div>
    </div>

    <div class="bottom-spacer"></div>

    <!-- BOTÓN DE DESCARGA FLOTANTE -->
    <div class="btn-download-container">
        <button id="btnDescargar" class="btn-download">
            <i class="fa-solid fa-download"></i> Descargar APK (Android)
        </button>
    </div>
    
    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Lógica de Descarga -->
    <script>
        document.getElementById('btnDescargar').addEventListener('click', function() {
            Swal.fire({
                title: '¿Descargar Aplicación?',
                text: "Estás a punto de descargar el instalador oficial (vocacional.apk) en tu dispositivo.",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#442484', // Tu morado principal
                cancelButtonColor: '#a17dc3', // Tu morado secundario
                confirmButtonText: '<i class="fa-solid fa-check"></i> Sí, descargar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true, // Pone el botón de confirmar a la derecha
                shape: 'pill'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Muestra una pequeña alerta de éxito antes de iniciar la descarga
                    Swal.fire({
                        title: 'Iniciando descarga...',
                        text: 'Revisa el panel de notificaciones de tu teléfono.',
                        icon: 'success',
                        timer: 2500,
                        showConfirmButton: false
                    });
                    
                    // Redirige directamente al servidor de Amazon S3 con la región correcta
                    setTimeout(() => {
                        window.location.href = 'https://vocaciondev-pinaya.s3.us-east-2.amazonaws.com/vocacionalv5.apk';
                    }, 800);
                }
            });
        });
    </script>
</body>
</html>
