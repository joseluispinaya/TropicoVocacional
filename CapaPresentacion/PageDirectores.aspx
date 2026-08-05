<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="PageDirectores.aspx.cs" Inherits="CapaPresentacion.PageDirectores" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/fileimputnew.css" rel="stylesheet"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Directores
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-12">
            <div class="card bx-shadow" style="border-radius: 12px; overflow: hidden;">
                <!-- Banda de color superior -->
                <div class="bg-primary" style="height: 10px;"></div>
                <div class="card-body p-4">
                    <div class="media align-items-center">
                        <!-- Ícono representativo de Director/Liderazgo -->
                        <div class="mr-4 text-center d-none d-sm-block">
                            <div style="width: 80px; height: 80px; background: #e0f0ff; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-user-tie fa-3x text-primary"></i>
                            </div>
                        </div>
                        
                        <div class="media-body">
                            <h4 class="font-weight-bold text-dark m-t-0 m-b-5">Gestión de Directores</h4>
                            <p class="text-muted m-b-0 font-14" style="max-width: 700px; line-height: 1.5;">
                                Administra los perfiles de los responsables de cada <b>Unidad Educativa</b>. 
                                Los directores tienen acceso al sistema para monitorear los resultados del test vocacional y las recomendaciones de la IA de sus respectivos estudiantes.
                            </p>
                        </div>
                        
                        <div class="ml-auto">
                            <!-- Botón de Nuevo Registro (Call to Action) -->
                            <button type="button" id="btnRegistro" class="btn btn-primary btn-lg waves-effect waves-light shadow-sm" style="border-radius: 8px;">
                                <i class="fas fa-user-plus mr-2"></i> Registrar Director
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ============================================================== -->
    <!-- TABLA DE DATOS -->
    <!-- ============================================================== -->
    <div class="row mt-3">
        <div class="col-12">
            <div class="card bx-shadow" style="border-radius: 12px;">
                <div class="card-body p-4">
                    <h5 class="m-t-0 m-b-30 border-bottom pb-3 text-dark">
                        <i class="fas fa-list-ul text-primary mr-2"></i> Directorio de Administradores
                    </h5>
                    
                    <div class="table-responsive">
                        <table id="tbDatas" class="table table-hover table-sm m-0 w-100">
                            <thead class="bg-light text-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Director(a)</th>
                                    <th>Contacto (Correo)</th>
                                    <th>Unidad Educativa</th>
                                    <th class="text-center">Estado</th>
                                    <th class="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ============================================================== -->
    <!-- MODAL DE REGISTRO / EDICIÓN -->
    <!-- ============================================================== -->
    <div class="modal fade" id="mdData" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="border-radius: 12px; overflow: hidden;">
                <div class="modal-header bg-light">
                    <!-- SPAN para proteger el ícono al usar .text() en JS -->
                    <h4 class="modal-title m-0 text-dark font-weight-bold"><i class="fas fa-id-badge mr-2 text-primary"></i> <span id="myModalLabel">Perfil de Director</span></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                
                <div class="modal-body p-4">
                    <div class="row">

                        <!-- Cambiamos a col-lg-4 para darle más ancho al botón -->
                        <div class="col-lg-4 col-md-4 text-center mb-3 mb-lg-0 border-right">
                            <h6 class="text-muted font-weight-bold mb-3">Fotografía Formatos: JPG, PNG.</h6>
                            <div class="img-preview-container mx-auto mb-3">
                                <img id="imgDirectReg" src="images/sinimagen.png" alt="Foto usuario" class="est-perfil">
                            </div>

                            <div class="custom-file text-left mt-3">
                                <input type="file" class="custom-file-input" id="txtFotoUr" accept="image/*">
                                <!-- Usamos un texto por defecto más corto -->
                                <label class="custom-file-label" for="txtFotoUr">Sin archivo...</label>
                            </div>
                            <%--<small class="text-muted d-block mt-2">Formatos: JPG, PNG.</small>--%>

                            <div class="form-row">

                                <div class="form-group col-sm-12">
                                    <label for="cboEstado" class="font-weight-bold text-dark">Estado</label>
                                    <select class="form-control form-control-sm" id="cboEstado">
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Cambiamos a col-lg-8 -->
                        <div class="col-lg-8 col-md-8 pl-lg-4">
                            <h6 class="text-primary font-weight-bold mb-3 border-bottom pb-2">Datos Personales y de Acceso</h6>

                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtNombres" class="font-weight-bold text-dark">Nombres</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend"><span class="input-group-text bg-light"><i class="fas fa-user text-muted"></i></span></div>
                                        <input type="text" class="form-control model" id="txtNombres" name="Nombres" placeholder="Nombres">
                                    </div>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="txtApellidos" class="font-weight-bold text-dark">Apellidos</label>
                                    <input type="text" class="form-control model" id="txtApellidos" name="Apellidos" placeholder="Apellidos">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtNroci" class="font-weight-bold text-dark">Nro. Carnet (C.I.)</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend"><span class="input-group-text bg-light"><i class="fas fa-id-card text-muted"></i></span></div>
                                        <input type="text" class="form-control model" id="txtNroci" name="Nro ci" placeholder="Identidad">
                                    </div>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="txtCelular" class="font-weight-bold text-dark">Celular</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend"><span class="input-group-text bg-light"><i class="fas fa-mobile-alt text-muted"></i></span></div>
                                        <input type="text" class="form-control model" id="txtCelular" name="Celular" placeholder="Celular">
                                    </div>
                                </div>
                            </div>

                            <h6 class="text-primary font-weight-bold mb-3 mt-2 border-bottom pb-2">Asignación Institucional</h6>

                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtCorreo" class="font-weight-bold text-dark">Correo Electrónico</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend"><span class="input-group-text bg-light"><i class="fas fa-envelope text-muted"></i></span></div>
                                        <input type="email" class="form-control model" id="txtCorreo" name="Correo" placeholder="correo@ejemplo.com">
                                    </div>
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="cboUnidadEd" class="font-weight-bold text-dark">Unidad Educativa</label>
                                    <select class="form-control" id="cboUnidadEd"></select>
                                </div>
                            </div>

                            <%--<h6 class="text-primary font-weight-bold mb-3 mt-2 border-bottom pb-2">Asignación Institucional</h6>--%>

                            
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer bg-light">
                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Cancelar</button>
                    <button id="btnGuardarCambios" type="button" class="btn btn-primary waves-effect waves-light"><i class="fas fa-save mr-2"></i>Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/plugins/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="assets/plugins/datatables/dataTables.responsive.min.js"></script>
    <script src="assets/plugins/datatables/responsive.bootstrap4.min.js"></script>

    <script src="js/PageDirectores.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
