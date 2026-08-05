<%@ Page Title="" Language="C#" MasterPageFile="~/MenuDocentes/MasterDocentes.Master" AutoEventWireup="true" CodeBehind="PanelEstudiantes.aspx.cs" Inherits="CapaPresentacion.MenuDocentes.PanelEstudiantes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/css/fileimputnew.css" rel="stylesheet"/>
    <link href="../assets/pluginzero/select2/select2.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Historial de Test
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card border-0 shadow-sm bg-white" style="border-top: 4px solid #ffc107 !important;">

                <div class="card-header bg-white border-bottom py-3 d-flex align-items-center justify-content-between">
                    <h6 class="font-weight-bold text-dark m-0">
                        <i class="fas fa-hand-holding-usd text-success mr-2"></i>Historial de Test por Estudiante
                    </h6>
                    <span class="badge badge-light text-muted px-2 py-1">Historial Test</span>
                </div>

                <div class="card-body">
                    <input id="txtIdEstudiante" value="0" type="hidden" />

                    <div class="row mb-2">

                        <div class="col-md-6 mb-3">

                            <div class="bg-light p-3 rounded border shadow-sm mb-3">
                                <div class="form-group mb-0">
                                    <label for="cboBuscarEstudian" class="small font-weight-bold text-muted mb-1">
                                        <i class="fas fa-search mr-1"></i>Buscar Estudiante
                                    </label>
                                    <select class="form-control form-control-sm" id="cboBuscarEstudian" style="width: 100%;">
                                        <option value=""></option>
                                    </select>

                                    <small class="text-muted mt-2 d-block">Selecciona un estudiante para ver historial.</small>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-6 mb-3">
                            <div class="border rounded bg-light p-3 shadow-sm">
                                <div class="d-flex align-items-center mb-3">
                                    <img id="imgEstde" src="../images/sinimagen.png" alt="Perfil" class="rounded-circle shadow mr-3" style="width: 65px; height: 65px; object-fit: cover; border: 2px solid #004F9F;">
                                    <div>
                                        <h5 id="lblNombres" class="mb-1 text-dark font-weight-bold" style="font-size: 1.1rem;">Esperando..</h5>
                                        <span id="lblDatos" class="badge badge-secondary p-1 shadow-sm">Seleccione un estudiante</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-12 mb-3">
                            <h5 class="font-weight-bold text-dark m-0 text-center border-bottom pb-2">
                                <i class="fas fa-clipboard-check mr-2 text-primary"></i>
                                <span id="lblMateriaSelect">Resultados de la Consulta</span>
                            </h5>
                        </div>

                        <div class="col-md-12 mb-3">
                            <div class="bg-light p-2 rounded border shadow-sm">
                                <h6 class="font-weight-bold text-dark border-bottom pb-2 mb-3">
                                    <i class="fas fa-clock text-info mr-2"></i>Historial de Evaluaciones
                                </h6>

                                <div class="table-responsive">
                                    <table class="table table-sm table-striped table-bordered" id="tbDataHist" cellspacing="0" width="100%">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Descripcion General</th>
                                                <th></th>
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
                <input id="txtFechaTest" type="hidden" />
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
    <script src="../assets/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="../assets/plugins/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="../assets/plugins/datatables/dataTables.responsive.min.js"></script>
    <script src="../assets/plugins/datatables/responsive.bootstrap4.min.js"></script>

    <script src="../assets/pluginzero/select2/select2.min.js"></script>
    <script src="../assets/pluginzero/select2/es.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>

    <script src="jsDirector/PanelEstudiantes.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
