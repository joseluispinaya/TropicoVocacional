<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="PageEstudiantes.aspx.cs" Inherits="CapaPresentacion.PageEstudiantes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/fixedHeader.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/scroller.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/pluginzero/select2/select2.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Estudiantes
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-header bg-primary py-2 px-4">
                    <h3 class="card-title m-0"><i class="fas fa-user-friends mr-2"></i>Lista de Estudiantes</h3>
                </div>
                <div class="card-body">

                    <div class="form-row align-items-end mb-3">

                        <div class="form-group col-sm-8">
                            <label for="cboUnidadEdGe">Seleccione UE Educativa</label>
                            <select class="form-control form-control-sm form-new" id="cboUnidadEdGe">
                            </select>
                        </div>

                        <div class="form-group col-sm-4">
                            <button type="button" id="btnNuevo" class="btn btn-primary btn-sm"><i class="fas fa-plus-circle mr-2"></i>Nuevo Registro</button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-12">
                            <table class="table table-sm table-striped table-bordered" id="tbData" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Estudiantes</th>
                                        <%--<th>Nro CI</th>
                                        <th>Estado</th>--%>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card">
                <div class="card-header bg-primary py-2 px-4">
                    <h3 class="card-title m-0"><i class="fas fa-user-friends mr-2"></i>Historial Test</h3>
                </div>
                <div class="card-body">
                    <h5 class="m-b-15 m-t-0 text-center" id="lblNombreEsr">Lista</h5>

                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-12">
                            <table class="table table-sm table-striped table-bordered" id="tbDataHist" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Descripcion General</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="mdData" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myModalLabel">Detalle</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label for="txtnombres">Nombre</label>
                            <input type="text" class="form-control input-sm model" id="txtnombres" name="Nombres" autocomplete="off">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="txtapellidos">Apellidos</label>
                            <input type="text" class="form-control input-sm model" id="txtapellidos" name="Apellidos" autocomplete="off">
                        </div>

                    </div>
                    <div class="form-row">
                        <div class="form-group col-sm-4">
                            <label for="txtNroci">Nro CI</label>
                            <input type="text" class="form-control input-sm model" id="txtNroci" name="Nro CI" autocomplete="off">
                        </div>
                        <div class="form-group col-sm-8">
                            <label for="txtCorreo">Correo</label>
                            <input type="text" class="form-control input-sm model" id="txtCorreo" name="Correo">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-sm-4">
                            <label for="cboEstado">Estado</label>
                            <select class="form-control form-control-sm" id="cboEstado">
                                <option value="1">Activo</option>
                                <option value="0">No Activo</option>
                            </select>
                        </div>
                        <div class="form-group col-sm-8">
                            <label for="cboUnidadEd">Unidad Edu</label>
                            <select id="cboUnidadEd" class="form-control form-control-sm" data-width="100%"></select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardar" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>

    <div id="mdDetalles" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabeldett" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myModalLabeldett">Detalle</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <h5 class="m-b-15 m-t-0 text-center">Lista de Recomendaciones</h5>
                    <div class="row">
                        <div class="col-sm-12">
                            <table class="table table-sm table-striped table-bordered" id="tbDetalleHistor" width="100%">
                                <thead>
                                    <tr>
                                        <th>Carrera</th>
                                        <th>Justificacion</th>
                                        <th>Puntaje</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal"><i class="fas fa-window-close mr-2"></i>Cerrar</button>
                    <button id="btnReport" type="button" class="btn btn-sm btn-primary"><i class="fas fa-file-pdf mr-2"></i>Generar Reporte</button>
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

    <script src="assets/pluginzero/select2/select2.min.js"></script>

    <script src="js/Estudiantes.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
