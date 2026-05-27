<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="ListaEstudiantes.aspx.cs" Inherits="CapaPresentacion.ListaEstudiantes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/fixedHeader.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/scroller.bootstrap.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Estudiantes por Unidad Educativa
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="m-t-0 m-b-20 header-title"><i class="fa fa-filter text-primary m-r-10"></i>Filtros de Búsqueda</h4>

                    <div class="form-group m-b-25">
                        <label for="cboUnidadEducativa" class="font-600 text-muted m-b-10">Unidad Educativa / Colegio</label>
                        <div class="input-group">
                            <select class="form-control form-new" id="cboUnidadEducativa">
                            </select>
                        </div>
                        <small class="text-muted m-t-5 d-block">Selecciona una institución para listar a sus estudiantes.</small>
                    </div>

                    <hr class="m-t-20 m-b-20" style="border-top: 1px solid #eeeeee;" />

                    <h4 class="m-t-0 m-b-20 header-title"><i class="fa fa-file text-success m-r-10"></i>Acciones Disponibles</h4>

                    <p class="text-muted font-13 m-b-20">
                        Puedes exportar el reporte consolidado de los tests vocacionales y las recomendaciones de la IA pertenecientes a la unidad educativa seleccionada.
                    </p>

                    <button id="btnGenerarReporte" type="button" class="btn btn-success btn-md waves-effect waves-light w-100" disabled>
                        <i class="fa fa-file-pdf m-r-5"></i>Generar Reporte Completo
                    </button>
                </div>
            </div>
        </div>

        <div class="col-lg-8">
            <div class="card">
                <div class="card-body">
                    <div class="m-b-30 m-t-0">
                        <span class="badge badge-primary float-right p-2" id="lblContadorEstudiantes" style="font-size: 12px; border-radius: 4px;">0 Alumnos</span>
                        <h4 class="m-0"><i class="fa fa-users text-primary m-r-10"></i>Estudiantes por Unidad Educativa</h4>
                    </div>

                    <div class="table-responsive">
                        <table id="tbDatas" class="table table-hover m-0">
                            <thead class="bg-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Estudiantes</th>
                                    <th>Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="rowPlaceholder">
                                    <td colspan="3" class="text-center text-muted p-t-30 p-b-30">
                                        <i class="fas fa-school fa-2x m-b-10 d-block text-success"></i>
                                        Por favor, seleccione una Unidad Educativa en el panel izquierdo para ver los registros.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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

    <script src="js/ListaEstudiantes.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
