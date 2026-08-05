<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="PageEstudiantes.aspx.cs" Inherits="CapaPresentacion.PageEstudiantes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/fileimputnew.css" rel="stylesheet"/>
    <link href="assets/pluginzero/select2/select2.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Estudiantes
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-lg-5">
        <div class="card bx-shadow" style="border-radius: 12px; height: 100%;">
            <div class="card-body p-4">
                
                <h4 class="m-t-0 m-b-20 border-bottom pb-3 text-dark">
                    <i class="fas fa-users text-primary mr-2"></i> Directorio de Estudiantes
                </h4>

                <div class="bg-light p-3 mb-4" style="border-radius: 8px; border: 1px solid #e9ecef;">
                    <label for="cboUnidadEdGe" class="font-weight-bold text-dark m-b-5">
                        <i class="fas fa-school text-secondary mr-1"></i> Unidad Educativa
                    </label>
                    <select class="form-control form-new shadow-sm" id="cboUnidadEdGe" style="border-radius: 6px; border: 1px solid #ced4da;">
                    </select>
                </div>

                <div class="table-responsive">
                    <!-- Eliminamos table-bordered para un aspecto más limpio -->
                    <table class="table table-hover table-sm m-0 w-100" id="tbData">
                        <thead class="bg-light text-dark">
                            <tr>
                                <th>Id</th>
                                <th style="width: 65%;">Estudiante</th>
                                <th style="width: 25%;" class="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-7">
        <div class="card bx-shadow" style="border-radius: 12px; height: 100%;">
            <div class="card-body p-4">
                
                <!-- Cabecera Flex para alinear el título y el badge del nombre -->
                <div class="d-flex justify-content-between align-items-center border-bottom pb-3 m-b-20">
                    <h4 class="m-0 text-dark">
                        <i class="fas fa-history text-info mr-2"></i> Historial de Evaluaciones
                    </h4>
                    <!-- Badge dinámico para el nombre del estudiante -->
                    <span class="badge badge-info px-3 py-2 shadow-sm" id="lblNombreEsr" style="font-size: 13px; border-radius: 20px;">
                        Seleccione un estudiante
                    </span>
                </div>

                <div class="table-responsive">
                    <!-- Eliminamos table-bordered -->
                    <table class="table table-hover m-0 w-100" id="tbDataHist">
                        <thead class="bg-light text-dark">
                            <tr>
                                <th>Id</th>
                                <th style="width: 75%;">Análisis General (IA)</th>
                                <th style="width: 15%;" class="text-center">Detalle</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="mdDetalles" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabeldett" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" style="border-radius: 12px; overflow: hidden;">
            <div class="modal-header bg-light">
                <h4 class="modal-title m-0 text-dark font-weight-bold">
                    <i class="fas fa-clipboard-check mr-2 text-success"></i> 
                    <span id="myModalLabeldett">Resultados del Test</span>
                </h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            
            <div class="modal-body p-4">
                <h6 class="text-primary font-weight-bold mb-3 border-bottom pb-2">Top Carreras Recomendadas por IA</h6>

                <div class="alert alert-success shadow-sm mb-3" style="border-left: 4px solid #ffc107 !important;">
                    <h6 class="font-weight-bold mb-1">
                        <i class="fas fa-graduation-cap mr-2"></i>Análisis General
                    </h6>
                    <p class="m-0 small text-dark">
                        <span id="lblObservaGen">Cargando...</span>
                    </p>
                </div>
                
                <div class="table-responsive mt-3">
                    <table class="table table-hover table-sm m-0 w-100" id="tbDetalleHistor">
                        <thead class="bg-light text-dark">
                            <tr>
                                <th>Carreras</th>
                                <th>Justificación</th>
                                <th class="text-center">Afinidad</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            
            <div class="modal-footer bg-light" style="border-radius: 0 0 12px 12px;">
                <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Cerrar</button>
                <button id="btnReport" type="button" class="btn btn-primary waves-effect waves-light">
                    <i class="fas fa-file-pdf mr-2"></i>Generar Reporte
                </button>
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

    <script src="assets/pluginzero/select2/select2.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>

    <script src="js/Estudiantes.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
