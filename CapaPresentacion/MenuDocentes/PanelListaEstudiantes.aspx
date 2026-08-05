<%@ Page Title="" Language="C#" MasterPageFile="~/MenuDocentes/MasterDocentes.Master" AutoEventWireup="true" CodeBehind="PanelListaEstudiantes.aspx.cs" Inherits="CapaPresentacion.MenuDocentes.PanelListaEstudiantes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/css/fileimputnew.css" rel="stylesheet"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Estudiantes por Unidad Educativa
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">

                    <div class="border rounded p-3 shadow-sm bg-white" style="border-left: 4px solid #ffc107 !important;">
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <div class="mb-2 mb-md-0">
                                <h5 class="font-weight-bold text-dark m-0"><i class="fas fa-file-pdf text-danger mr-2"></i>Exportar Documento</h5>
                                <small class="text-muted">Genera el reporte detallado de los estudiantes registrados.</small>
                            </div>
                            <div>
                                <button type="button" id="btnReporte" class="btn btn-warning btn-sm shadow-sm font-weight-bold px-3" disabled>
                                    <i class="fas fa-print mr-2"></i>GENERAR REPORTE
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="border rounded p-3 shadow-sm bg-white m-t-30" style="border-left: 4px solid #ffc107 !important;">
                        <div class="m-b-30 m-t-0">
                            <span class="badge badge-primary float-right p-2" id="lblContadorEstudiantes" style="font-size: 12px; border-radius: 4px;">0 Alumnos</span>
                            <h4 class="m-0"><i class="fa fa-users text-primary m-r-10"></i>Estudiantes Registrados</h4>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-sm table-striped table-bordered" id="tbDatas" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Estudiantes</th>
                                        <th>Detalle</th>
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
    </div>

    <div id="mdDetallesHis" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabeldett" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="border-radius: 12px; overflow: hidden;">
                <div class="modal-header bg-light">
                    <h4 class="modal-title m-0 text-dark font-weight-bold">
                        <i class="fas fa-clipboard-check mr-2 text-success"></i>
                        <span id="myModalLabeldett">Detalles del Historial</span>
                    </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>

                <div class="modal-body p-4">
                    <h6 class="text-primary font-weight-bold mb-3 border-bottom pb-2">Historial de Tests</h6>

                    <%--<div class="border rounded p-3 shadow-sm bg-white" style="border-left: 4px solid #ffc107 !important;">
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <div class="mb-2 mb-md-0">
                                <h5 class="font-weight-bold text-dark m-0"><i class="fas fa-file-pdf text-danger mr-2"></i>Exportar Documento</h5>
                                <small class="text-muted">Genera el reporte de los test realizados.</small>
                            </div>
                            <div>
                                <button type="button" id="btnReporteHis" class="btn btn-warning btn-sm shadow-sm font-weight-bold px-3" disabled>
                                    <i class="fas fa-print mr-2"></i>GENERAR REPORTE
                                </button>
                            </div>
                        </div>
                    </div>--%>

                    <div class="table-responsive mt-3">
                        <table class="table table-hover table-sm m-0 w-100" id="tbDataHist">
                            <thead class="bg-light text-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Análisis General (IA)</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>

                <div class="modal-footer bg-light" style="border-radius: 0 0 12px 12px;">
                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="../assets/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="../assets/plugins/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="../assets/plugins/datatables/dataTables.responsive.min.js"></script>
    <script src="../assets/plugins/datatables/responsive.bootstrap4.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>

    <script src="jsDirector/PanelListaEstudiantes.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
