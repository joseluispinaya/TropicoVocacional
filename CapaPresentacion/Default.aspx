<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="CapaPresentacion.Default" %>

<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading</title>
    <style>
        body {
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: radial-gradient(circle at center, #0f2027, #203a43, #2c5364);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #00f9ff;
            overflow: hidden;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* Imagen con animación (elige la clase) */
        .logo-rotate {
            width: 180px;
            height: auto;
            animation: spinSlow 12s linear infinite;
            filter: drop-shadow(0 0 15px rgba(0, 249, 255, 0.8));
        }

        .logo-float {
            width: 180px;
            height: auto;
            animation: float 3s ease-in-out infinite;
            filter: drop-shadow(0 0 15px rgba(0, 249, 255, 0.8));
        }

        @keyframes spinSlow {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }

            50% {
                transform: translateY(-20px);
            }
        }

        .text {
            margin-top: 20px;
            font-size: 1.3rem;
            text-align: center;
            animation: glow 1.5s ease-in-out infinite alternate;
            letter-spacing: 2px;
        }

        @keyframes glow {
            from {
                text-shadow: 0 0 5px #00f9ff, 0 0 10px #00f9ff, 0 0 20px #00f9ff;
            }

            to {
                text-shadow: 0 0 10px #ff00f7, 0 0 20px #ff00f7, 0 0 40px #ff00f7;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Usa la clase logo-rotate para rotación lenta o logo-float para flotación -->
        <img src="images/logodefault.png" alt="Logo" class="logo-float">
        <div class="text">Cargando...</div>
    </div>

    <script>
        setTimeout(function () {
            window.location.href = 'Login.aspx';
        }, 5000);
    </script>
</body>
</html>
