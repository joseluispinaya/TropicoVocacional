<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="PageCuestionario.aspx.cs" Inherits="CapaPresentacion.PageCuestionario" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Cuestionarios
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        
        <div class="col-lg-4">
            <div class="card text-center bx-shadow" style="border-radius: 12px; overflow: hidden;">
                <div class="card-body p-t-30 p-b-30">
                    
                    <div class="mb-4">
                        <img src="images/logoCuestionario.jpg" alt="Test Vocacional IA" 
                             class="img-fluid rounded-circle shadow-sm" 
                             style="max-width: 200px; border: 4px solid #f5f5f5;">
                    </div>

                    <h4 class="font-weight-bold text-dark m-b-15">Gestión de Cuestionarios</h4>
                    
                    <p class="text-muted font-14 m-b-30" style="line-height: 1.6;">
                        Administra las baterías de preguntas del <b>Test Vocacional</b>. Estas evaluaciones son el núcleo principal de información que nuestra <b>Inteligencia Artificial</b> utilizará para analizar el perfil, aptitudes e intereses de cada estudiante.
                    </p>

                    <button type="button" id="btnRegistro" class="btn btn-primary btn-lg waves-effect waves-light w-100 shadow-sm" style="border-radius: 8px;">
                        <i class="fas fa-plus-circle mr-2"></i> Crear Nuevo Cuestionario
                    </button>
                </div>
            </div>

            <%--<div class="card bg-info text-white bx-shadow mt-3" style="border-radius: 12px;">
                <div class="card-body p-3">
                    <div class="media align-items-center">
                        <i class="fas fa-lightbulb fa-2x mr-3 text-white" style="opacity: 0.7;"></i>
                        <div class="media-body">
                            <h6 class="m-0 text-white font-weight-bold">Tip del Sistema</h6>
                            <small class="m-0">Estructura preguntas claras para obtener mejores recomendaciones de la IA.</small>
                        </div>
                    </div>
                </div>
            </div>--%>
        </div>

        <div class="col-lg-8">
            <div class="card bx-shadow" style="border-radius: 12px;">
                <div class="card-body p-4">
                    
                    <h4 class="m-t-0 m-b-30 border-bottom pb-3 text-dark">
                        <i class="fas fa-list-ul text-primary mr-2"></i> Directorio de Evaluaciones
                    </h4>

                    <div class="table-responsive">
                        <table id="tbDatas" class="table table-hover table-sm m-0 w-100">
                            <thead class="bg-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Título</th>
                                    <th>Descripción</th>
                                    <th class="text-center">Preguntas</th>
                                    <th class="text-center">Acciones</th>
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

    <div id="mdData" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="border-radius: 10px;">
                <div class="modal-header">
                    <!-- Recuerda usar el <span> para no borrar el ícono en tu .js -->
                    <h4 class="modal-title m-0"><i class="fas fa-edit mr-2 text-primary"></i> <span id="myModalLabel">Detalle Cuestionario</span></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body p-4">
                    <div class="form-group">
                        <label for="txtTitulo" class="font-weight-bold">Título de la Evaluación</label>
                        <input type="text" class="form-control form-new" id="txtTitulo" autocomplete="off" placeholder="Ej: Evaluación de Habilidades...">
                    </div>
                    <div class="form-group">
                        <label for="txtDescripcion" class="font-weight-bold">Descripción (Instrucciones)</label>
                        <textarea class="form-control form-new" rows="4" id="txtDescripcion" placeholder="Describe brevemente el propósito de este test..."></textarea>
                    </div>
                </div>
                <div class="modal-footer bg-light" style="border-radius: 0 0 10px 10px;">
                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Cancelar</button>
                    <button id="btnGuardarCambios" type="button" class="btn btn-primary waves-effect waves-light"><i class="fas fa-save mr-2"></i>Guardar Cuestionario</button>
                </div>
            </div>
        </div>
    </div>

    <div id="mdDetalles" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabeldett" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="border-radius: 10px;">
                <div class="modal-header">
                    <h4 class="modal-title m-0"><i class="fas fa-question-circle mr-2 text-info"></i> <span id="myModalLabeldett">Preguntas del Test</span></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body p-4">
                    <div class="table-responsive">
                        <table class="table table-sm table-hover m-0" id="tbPreguntas" width="100%">
                            <thead class="bg-light">
                                <tr>
                                    <th>Id</th>
                                    <th>Texto de la Pregunta</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary waves-effect" data-dismiss="modal">Cerrar</button>
                    <button id="btnReport" type="button" class="btn btn-info waves-effect waves-light"><i class="fas fa-print mr-2"></i>Generar Reporte</button>
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>

    <script src="js/PageCuestionario.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
