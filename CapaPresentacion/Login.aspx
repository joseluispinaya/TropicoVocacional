<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CapaPresentacion.Login" %>

<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login - vocacional</title>
    <link rel="shortcut icon" href="assets/images/favicon.ico">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

    <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="assets/css/icons.css" rel="stylesheet" type="text/css">
    <link href="assets/css/loginvoca.css" rel="stylesheet" type="text/css">
</head>
<body>
    <div class="login-wrapper">
        <div class="container">
            <div class="row justify-content-center align-items-center" style="min-height: 100vh;">
                <div class="col-12 col-md-10 col-lg-8">

                    <div class="login-card shadow-lg">
                        <div class="row no-gutters">

                            <div class="col-md-6 login-image-section d-flex align-items-center justify-content-center p-4">
                                <img src="images/logodefault.png" alt="Logo Orientación Vocacional" class="img-fluid login-logo">
                            </div>

                            <div class="col-md-6 login-form-section p-4 p-md-5">
                                <div class="text-center mb-4">
                                    <h3 class="text-white font-weight-bold m-0">INICIAR SESIÓN</h3>
                                    <p class="text-muted mt-1"><small>Ingresa tus credenciales para continuar</small></p>
                                </div>

                                <div class="form-group mb-4">
                                    <label class="login-label">Correo Electrónico</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text login-icon-box"><i class="fas fa-envelope"></i></span>
                                        </div>
                                        <input type="email" id="txtCorreo" class="form-control login-input" placeholder="ejemplo@correo.com" autocomplete="off">
                                    </div>
                                </div>

                                <div class="form-group mb-4">
                                    <label class="login-label">Contraseña</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text login-icon-box"><i class="fas fa-lock"></i></span>
                                        </div>
                                        <input type="password" id="txtClave" class="form-control login-input" placeholder="********">
                                    </div>
                                </div>

                                <button type="button" id="btnLogin" class="btn btn-block font-weight-bold login-btn mt-4">
                                    INGRESAR <i class="fas fa-sign-in-alt ml-2"></i>
                                </button>

                                <div class="text-center mt-4">
                                    <a href="#" data-toggle="modal" data-target="#mdForgotPassword" class="forgot-link">¿Olvidó su contraseña?
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="mdForgotPassword" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background-color: #1e2229; color: #fff; border: 1px solid #3292e0;">
                <div class="modal-header border-0">
                    <h5 class="modal-title">Recuperar Contraseña</h5>
                    <button type="button" class="close text-white" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <p class="text-muted">Ingrese su correo electrónico y le enviaremos las instrucciones para restablecer su contraseña.</p>
                    <div class="form-group">
                        <input type="email" id="txtReCorreo" class="form-control login-input" placeholder="Ingrese su correo" autocomplete="off">
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancelar</button>
                    <button type="button" id="btnEnviar" class="btn btn-primary btn-sm" style="background-color: #3292e0;">Enviar Instrucciones</button>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/popper.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="assets/plugins/loadingoverlay/loadingoverlay.js"></script>
    <script src="js/Login.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</body>
</html>
