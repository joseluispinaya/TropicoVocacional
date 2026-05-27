<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="Configuraciones.aspx.cs" Inherits="CapaPresentacion.Configuraciones" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/fixedHeader.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/scroller.bootstrap.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Configuraciones
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-4">
            <div class="card text-center">
                <div class="card-body p-t-30 p-b-30">
                    <div class="text-primary m-b-20">
                        <i class="fa fa-graduation-cap fa-4x"></i>
                    </div>
                    <h4 class="m-b-15">Base de Conocimiento IA</h4>
                    <p class="text-muted m-b-30 font-14" style="line-height: 1.6;">
                        Gestiona el catálogo de <b>carreras universitarias en Bolivia</b>. 
                    El modelo de inteligencia artificial analizará los resultados del test vocacional de cada estudiante y cruzará sus aptitudes con esta base de datos para generar sus recomendaciones profesionales.
                    </p>

                    <button type="button" id="btnNuevoReg" class="btn btn-primary btn-md waves-effect waves-light w-100">
                        <i class="fa fa-plus m-r-5"></i>Registrar Nueva Carrera
                    </button>
                </div>
            </div>

            <div class="card bg-info text-white">
                <div class="card-body">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="text-white m-t-0 m-b-5">Motor de Recomendación</h5>
                            <p class="m-b-0 font-13">Catálogo enlazado y activo.</p>
                        </div>
                        <div class="ml-auto">
                            <i class="fa fa-check-circle fa-2x"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-8">
            <div class="card">
                <div class="card-body">
                    <h4 class="m-t-0 m-b-30">Directorio de Carreras Habilitadas</h4>

                    <div class="table-responsive">
                        <table id="tbDatas" class="table table-hover table-sm m-0">
                            <thead class="bg-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Carreras</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="mdData" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myModalLabel"><i class="fa fa-book m-r-10"></i>Gestión de Carrera</h4>
                    <%--<h4 class="modal-title m-0" id="myModalLabel">
                        <i class="fa fa-book m-r-10"></i>
                        <span id="txtTituloModal">Gestión de Carrera</span> </h4>--%>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body p-4">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="txtCarrera" class="control-label">Nombre de la Carrera</label>
                                <input type="text" class="form-control form-new" id="txtCarrera" placeholder="Ej. Ingeniería de Sistemas">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="cboEstado" class="control-label">Estado</label>
                                <select class="form-control form-new" id="cboEstado">
                                    <option value="1">Activo (Visible para la IA)</option>
                                    <option value="0">Inactivo (Oculto)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarCambios" type="button" class="btn btn-primary waves-effect waves-light">Guardar Carrera</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/plugins/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="assets/plugins/datatables/dataTables.buttons.min.js"></script>
    <script src="assets/plugins/datatables/buttons.bootstrap4.min.js"></script>

    <script src="assets/plugins/datatables/jszip.min.js"></script>
    <script src="assets/plugins/datatables/pdfmake.min.js"></script>
    <script src="assets/plugins/datatables/vfs_fonts.js"></script>
    <script src="assets/plugins/datatables/buttons.html5.min.js"></script>
    <script src="assets/plugins/datatables/buttons.print.min.js"></script>
    <script src="assets/plugins/datatables/dataTables.fixedHeader.min.js"></script>
    <script src="assets/plugins/datatables/dataTables.keyTable.min.js"></script>
    <script src="assets/plugins/datatables/dataTables.scroller.min.js"></script>


    <script src="assets/plugins/datatables/dataTables.responsive.min.js"></script>
    <script src="assets/plugins/datatables/responsive.bootstrap4.min.js"></script>

    <script src="js/Configuraciones.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
