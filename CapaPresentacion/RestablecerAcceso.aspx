<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RestablecerAcceso.aspx.cs" Inherits="CapaPresentacion.RestablecerAcceso" %>

<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset="utf-8" />
    <title>Restablecer Contraseña | Sistema Vocacional</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- CDNs -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

    <style>
        body {
            background-color: #f4f7f6;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .reset-card {
            width: 100%;
            max-width: 480px;
            border-radius: 15px;
            border: none;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            background: #ffffff;
        }

        .reset-header {
            background: linear-gradient(135deg, #3292e0 0%, #1e5799 100%);
            color: white;
            border-radius: 15px 15px 0 0;
            padding: 25px 20px; /* Redujimos el padding vertical */
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .hero-img {
            width: 75px; /* Redujimos el tamaño para que encaje mejor al lado */
            height: 75px;
            border-radius: 50%;
            border: 3px solid #ffffff;
            background: #ffffff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            margin-right: 15px; /* Separación con el texto */
            /* Eliminamos los márgenes negativos que la hacían flotar */
        }

        .header-text {
            text-align: left;
        }

        .form-control {
            border-radius: 6px;
            height: 45px;
        }

        .input-group-text {
            border-radius: 0 6px 6px 0;
            background-color: #f8f9fa;
        }

        .btn-restablecer {
            background-color: #3292e0;
            border-color: #3292e0;
            height: 45px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 16px;
        }

            .btn-restablecer:hover {
                background-color: #2186d8;
            }
    </style>
</head>
<body>

    <div class="container d-flex justify-content-center" id="cardContainer">
        <div class="card reset-card mt-4">
            <div class="reset-header">
                <img src="images/infoswal.png" alt="Orientación Vocacional" class="hero-img">
                <div class="header-text">
                    <h4 class="font-weight-bold m-0" style="font-size: 1.25rem;">Crear Nueva Contraseña</h4>
                    <p class="small text-light mt-1 mb-0">Complete los campos para recuperar su acceso.</p>
                </div>
            </div>
            
            <div class="card-body p-4">
                
                <!-- Correo (Readonly) -->
                <div class="form-group mb-3">
                    <label class="font-weight-bold text-dark small">Cuenta de Correo</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-light rounded-left"><i class="fas fa-envelope text-muted"></i></span>
                        </div>
                        <input type="email" id="txtCorreo" class="form-control font-weight-bold text-secondary" readonly>
                    </div>
                </div>

                <!-- Nueva Contraseña -->
                <div class="form-group mb-2">
                    <label for="txtPassNueva" class="font-weight-bold text-dark small">Nueva Contraseña</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-light rounded-left"><i class="fas fa-lock text-muted"></i></span>
                        </div>
                        <input type="password" id="txtPassNueva" class="form-control pwd-input" placeholder="Mínimo 8 caracteres">
                        <div class="input-group-append">
                            <span class="input-group-text pwd-toggle" style="cursor: pointer;"><i class="fas fa-eye text-muted"></i></span>
                        </div>
                    </div>
                </div>

                <!-- Medidor de Seguridad -->
                <div class="mb-4">
                    <div class="progress" style="height: 6px; border-radius: 3px;">
                        <div id="pwdStrengthBar" class="progress-bar" role="progressbar" style="width: 0%;"></div>
                    </div>
                    <div class="d-flex justify-content-between mt-1" style="font-size: 11px;">
                        <span id="pwdStrengthText" class="font-weight-bold text-muted">Seguridad</span>
                        <span class="text-muted"><i id="reqLength" class="fas fa-times text-danger"></i> 8+ Caract.</span>
                        <span class="text-muted"><i id="reqMayus" class="fas fa-times text-danger"></i> Mayúscula</span>
                        <span class="text-muted"><i id="reqNum" class="fas fa-times text-danger"></i> Número</span>
                    </div>
                </div>

                <!-- Confirmar Contraseña -->
                <div class="form-group mb-4">
                    <label for="txtPassConfirma" class="font-weight-bold text-dark small">Confirmar Contraseña</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-light rounded-left"><i class="fas fa-check-double text-muted"></i></span>
                        </div>
                        <input type="password" id="txtPassConfirma" class="form-control pwd-input" placeholder="Repita su contraseña">
                        <div class="input-group-append">
                            <span class="input-group-text pwd-toggle" style="cursor: pointer;"><i class="fas fa-eye text-muted"></i></span>
                        </div>
                    </div>
                    <small id="pwdMatchText" class="text-danger font-weight-bold d-none mt-1">Las contraseñas no coinciden.</small>
                </div>

                <!-- Botón de Acción -->
                <button type="button" id="btnActualizarPass" class="btn btn-primary btn-block btn-restablecer shadow-sm" disabled>
                    Restablecer Acceso <i class="fas fa-arrow-right ml-2"></i>
                </button>
                
                <div class="text-center mt-4">
                    <a href="Login.aspx" class="text-muted small"><i class="fas fa-arrow-left mr-1"></i> Volver al Login</a>
                </div>

            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Asumiendo que esta es tu ruta correcta para el overlay -->
    <script src="assets/plugins/loadingoverlay/loadingoverlay.js"></script>
    <script src="js/RestablecerAcceso.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</body>
</html>
