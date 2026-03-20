<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="PageUndsEducativas.aspx.cs" Inherits="CapaPresentacion.PageUndsEducativas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/fixedHeader.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/scroller.bootstrap.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Unidades Educativas
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header bg-primary py-2 px-4">
                    <h3 class="card-title m-0"><i class="fas fa-school mr-2"></i>Lista de Unidades Educativas</h3>
                </div>
                <div class="card-body">
                    <div class="row justify-content-center mb-4">
                        <button type="button" id="btnAlerFire" class="btn btn-danger btn-sm mr-3"><i class="fas fa-user-plus mr-2"></i>Confirmacion</button>
                        <button type="button" id="btnSwaler" class="btn btn-success btn-sm mr-3"><i class="fas fa-address-book mr-2"></i>Decision</button>
                        <button type="button" id="btnTimerau" class="btn btn-info btn-sm"><i class="fas fa-address-book mr-2"></i>Timer aut</button>
                    </div>

                    <div class="row">
                        <div class="col-md-4 offset-md-4">
                            <div class="form-inline">
                                <div class="form-group">
                                    <label class="sr-only" for="textlab">Estudiante</label>
                                    <label class="fw-bold" id="textlab">Opcion</label>
                                </div>
                                <button type="button" class="btn btn-success btn-sm m-l-10" id="btnRegistro"><i class="fas fa-school mr-2"></i>Nuevo Registro</button>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-12 col-sm-12 col-12">
                            <table id="tbDatas" class="table table-sm table-striped table-bordered" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre U.E.</th>
                                        <th>Ubicacion</th>
                                        <th>Contacto</th>
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
                            <input type="text" class="form-control input-sm model" id="txtnombres" name="Nombre U.E.">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="txtNroCel">Nro Cel</label>
                            <input type="text" class="form-control input-sm model" id="txtNroCel" name="Nro cel">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="txtUbicacion">Ubicacion</label>
                        <input type="text" class="form-control input-sm model" id="txtUbicacion" name="Ubicacion">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarCambios" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
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

    <script src="js/UnidsEducativas.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
