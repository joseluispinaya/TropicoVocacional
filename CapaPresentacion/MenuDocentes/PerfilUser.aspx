<%@ Page Title="" Language="C#" MasterPageFile="~/MenuDocentes/MasterDocentes.Master" AutoEventWireup="true" CodeBehind="PerfilUser.aspx.cs" Inherits="CapaPresentacion.MenuDocentes.PerfilUser" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/css/fileimputnew.css" rel="stylesheet"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Perfil de Usuario
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row" id="cargando">
        
        <!-- ============================================================== -->
        <!-- COLUMNA IZQUIERDA: Datos Personales y Fotografía -->
        <!-- ============================================================== -->
        <div class="col-lg-7 mb-4">
            <div class="card bx-shadow" style="border-radius: 12px; border-top: 5px solid #3292e0 !important;">
                <div class="card-body p-4">
                    <h5 class="font-weight-bold text-dark mb-4 border-bottom pb-2">
                        <i class="fas fa-id-card mr-2 text-primary"></i>Información Personal
                    </h5>

                    <div class="row">
                        <!-- Sección de Fotografía -->
                        <div class="col-md-6 text-center mb-2 border-right">
                            <h6 class="text-muted font-weight-bold mb-3">Foto de Perfil</h6>
                            <div class="img-preview-container mx-auto mb-3">
                                <img id="imgDirectReg" src="../images/sinimagen.png" alt="Foto usuario" class="foto-perfil">
                            </div>

                            <div class="custom-file text-left mt-2">
                                <input type="file" class="custom-file-input" id="txtFotoUr" accept="image/*">
                                <label class="custom-file-label" for="txtFotoUr">Cambiar foto...</label>
                            </div>


                        </div>

                        <!-- Sección de Formulario -->
                        <div class="col-md-6 pl-md-4">


                            <div class="form-group bg-light p-3 rounded border">
                                <label for="txtUnidadEducativa" class="font-weight-bold text-muted">Unidad Educativa Asignada</label>
                                <!-- Readonly para evitar edición -->
                                <input type="text" class="form-control-plaintext font-weight-bold text-dark" id="txtUnidadEducativa" readonly value="Cargando...">
                            </div>

                            <div class="alert alert-info border-0 shadow-sm mb-3">
                                <i class="fas fa-info-circle mr-2 text-info"></i>Actualizar Informacion
                            </div>

                            <div class="form-group">
                                <label for="txtCorreo" class="font-weight-bold text-dark">Correo Electrónico</label>
                                <input type="email" class="form-control" id="txtCorreo" placeholder="correo@ejemplo.com">
                            </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label for="txtNombres" class="font-weight-bold text-dark">Nombres</label>
                            <input type="text" class="form-control" id="txtNombres" placeholder="Nombres">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="txtApellidos" class="font-weight-bold text-dark">Apellidos</label>
                            <input type="text" class="form-control" id="txtApellidos" placeholder="Apellidos">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label for="txtNroci" class="font-weight-bold text-dark">Nro. Carnet (C.I.)</label>
                            <input type="text" class="form-control" id="txtNroci" placeholder="Documento">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="txtCelular" class="font-weight-bold text-dark">Celular</label>
                            <input type="text" class="form-control" id="txtCelular" placeholder="Celular">
                        </div>
                    </div>
                    <button id="btnGuardarPerfil" type="button" class="btn btn-primary waves-effect waves-light float-right mt-2">
                        <i class="fas fa-save mr-2"></i>Actualizar Perfil
                    </button>
                </div>
            </div>
        </div>

        <!-- ============================================================== -->
        <!-- COLUMNA DERECHA: Seguridad y Contraseña -->
        <!-- ============================================================== -->
        <div class="col-lg-5 mb-4">
            <div class="card bx-shadow" style="border-radius: 12px; border-top: 5px solid #f03154 !important;">
                <div class="card-body p-4">
                    <h5 class="font-weight-bold text-dark mb-4 border-bottom pb-2">
                        <i class="fas fa-shield-alt mr-2 text-danger"></i>Seguridad de la Cuenta
                    </h5>

                    <div class="alert alert-info border-0 shadow-sm mb-4">
                        <i class="fas fa-info-circle mr-2 text-info"></i> Para cambiar su contraseña, ingrese la actual y defina una nueva.
                    </div>

                    <div class="form-group">
                        <label for="txtPassActual" class="font-weight-bold text-dark">Contraseña Actual</label>
                        <div class="input-group">
                            <input type="password" class="form-control pwd-input" id="txtPassActual" placeholder="Ingrese su contraseña actual">
                            <div class="input-group-append">
                                <span class="input-group-text pwd-toggle bg-light cursor-pointer" style="cursor: pointer;"><i class="fas fa-eye text-muted"></i></span>
                            </div>
                        </div>
                    </div>

                    <hr class="my-4">

                    <div class="form-group mb-2">
                        <label for="txtPassNueva" class="font-weight-bold text-dark">Nueva Contraseña</label>
                        <div class="input-group">
                            <input type="password" class="form-control pwd-input" id="txtPassNueva" placeholder="Mínimo 8 caracteres">
                            <div class="input-group-append">
                                <span class="input-group-text pwd-toggle bg-light cursor-pointer" style="cursor: pointer;"><i class="fas fa-eye text-muted"></i></span>
                            </div>
                        </div>
                    </div>

                    <!-- Medidor de Fuerza de Contraseña -->
                    <div class="mb-3">
                        <div class="progress" style="height: 6px;">
                            <div id="pwdStrengthBar" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div class="d-flex justify-content-between mt-1">
                            <small id="pwdStrengthText" class="text-muted font-weight-bold">Seguridad</small>
                            <small class="text-muted"><i id="reqLength" class="fas fa-times text-danger mr-1"></i> 8+ Caracteres</small>
                            <small class="text-muted"><i id="reqMayus" class="fas fa-times text-danger mr-1"></i> 1 Mayúscula</small>
                            <small class="text-muted"><i id="reqNum" class="fas fa-times text-danger mr-1"></i> 1 Número</small>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="txtPassConfirma" class="font-weight-bold text-dark">Confirmar Nueva Contraseña</label>
                        <div class="input-group">
                            <input type="password" class="form-control pwd-input" id="txtPassConfirma" placeholder="Repita la nueva contraseña">
                            <div class="input-group-append">
                                <span class="input-group-text pwd-toggle bg-light cursor-pointer" style="cursor: pointer;"><i class="fas fa-eye text-muted"></i></span>
                            </div>
                        </div>
                        <small id="pwdMatchText" class="text-danger font-weight-bold d-none mt-1">Las contraseñas no coinciden.</small>
                    </div>

                    <button id="btnActualizarPass" type="button" class="btn btn-danger waves-effect waves-light w-100 mt-3" disabled>
                        <i class="fas fa-key mr-2"></i>Actualizar Contraseña
                    </button>
                </div>
            </div>
        </div>

    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="jsDirector/PerfilUser.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
