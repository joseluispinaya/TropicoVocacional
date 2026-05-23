<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="PageUndsEducativas.aspx.cs" Inherits="CapaPresentacion.PageUndsEducativas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/fixedHeader.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/scroller.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <style>
        .card {
            border-radius: 12px;
        }

        .table thead th {
            border-top: 0;
            font-size: 13px;
            font-weight: 600;
            white-space: nowrap;
        }

        .icon-unidad {
            width: 45px;
            height: 45px;
            border-radius: 12px;
            background: rgba(0,123,255,.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #007bff;
            font-size: 20px;
        }

        .table td {
            vertical-align: middle !important;
            /*font-size: 13px;*/
        }

        .btn-action {
            width: 34px;
            height: 34px;
            padding: 0;
            border-radius: 8px;
        }

        .dataTables_wrapper .dataTables_filter input {
            border-radius: 8px;
            border: 1px solid #ced4da;
            padding: 5px 10px;
        }

        .dataTables_wrapper .dataTables_length select {
            border-radius: 8px;
        }

        .table-hover tbody tr:hover {
            background: #f8fbff;
        }

        .card-shadow {
            box-shadow: 0 0 15px rgba(0,0,0,.05);
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Unidades Educativas
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">

        <!-- PANEL IZQUIERDO -->
        <div class="col-lg-4 mb-3">

            <div class="card shadow-sm border-0 h-100">

                <div class="card-body text-center">

                    <div class="mb-4">
                        <i class="fas fa-school"
                            style="font-size: 70px; color: #007bff;"></i>
                    </div>

                    <h3 class="font-weight-bold mb-2">Unidades Educativas
                    </h3>

                    <p class="text-muted">
                        Administra el registro de unidades educativas,
                    responsables y datos de contacto.
                    </p>

                    <hr />

                    <div class="row text-center mb-4">

                        <div class="col-6">
                            <h2 class="font-weight-bold text-primary mb-0" id="txtTotalUE">0
                            </h2>
                            <small class="text-muted">Registrados
                            </small>
                        </div>

                        <div class="col-6">
                            <h2 class="font-weight-bold text-success mb-0">
                                <i class="fas fa-check-circle"></i>
                            </h2>
                            <small class="text-muted">Sistema Activo
                            </small>
                        </div>

                    </div>

                    <button type="button"
                        class="btn btn-primary btn-block btn-lg shadow-sm"
                        id="btnRegistro">

                        <i class="fas fa-plus-circle mr-2"></i>
                        Nuevo Registro

                    </button>

                </div>

            </div>

        </div>

        <!-- PANEL DERECHO -->
        <div class="col-lg-8">

            <div class="card shadow-sm border-0">

                <div class="card-header bg-white border-0">

                    <div class="d-flex justify-content-between align-items-center">

                        <div>
                            <h4 class="mb-0 font-weight-bold">
                                <i class="fas fa-list text-primary mr-2"></i>
                                Lista de Unidades Educativas
                            </h4>

                            <small class="text-muted">Información general registrada en el sistema
                            </small>
                        </div>

                    </div>

                </div>

                <div class="card-body pt-2">
                    <div class="table-responsive">

                        <table id="tbDatas" class="table table-hover table-sm align-middle">

                            <thead class="thead-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Unidad Educativa</th>
                                    <th>Información</th>
                                    <th width="110">Acciones</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
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
                    <!-- <h5 class="m-b-15 m-t-0 text-center" id="txtUndEdname">Lista</h5> -->
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <label for="txtnombres">Nombre U.E.</label>
                            <input type="text" class="form-control input-sm form-new model" id="txtnombres" name="Nombre U.E.">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="txtNroCel">Nro Cel</label>
                            <input type="text" class="form-control input-sm form-new model" id="txtNroCel" name="Nro cel">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="txtUbicacion">Ubicacion</label>
                        <input type="text" class="form-control input-sm form-new model" id="txtUbicacion" name="Ubicacion">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarCambios" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>

    <div id="mdDetalles" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabeldett" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myModalLabeldett">Detalle</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <h5 class="m-b-15 m-t-0 text-center">Lista de Estudiantes</h5>
                    <div class="row">
                        <div class="col-sm-12">
                            <table class="table table-sm table-striped table-bordered" id="tbDetalleEs" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Estudiantes</th>
                                        <th>Estado</th>
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

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>

    <script src="js/UnidsEducativas.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
