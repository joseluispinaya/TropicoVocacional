<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="PagePreguntas.aspx.cs" Inherits="CapaPresentacion.PagePreguntas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/fileimputnew.css" rel="stylesheet"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Preguntas
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-lg-4">
        <div class="card text-center bx-shadow" style="border-radius: 12px; overflow: hidden;">
            <div class="card-body p-t-30 p-b-30">
                
                <div class="mb-4">
                    <img src="images/infoswal.png" alt="Brújula Vocacional" 
                         class="img-fluid rounded-circle shadow-sm" 
                         style="max-width: 140px; border: 4px solid #f0f3f5;">
                </div>

                <h4 class="font-weight-bold text-dark m-b-15">Banco de Preguntas</h4>
                
                <p class="text-muted font-14 m-b-25" style="line-height: 1.5;">
                    Gestiona las preguntas que alimentan el perfilamiento de los estudiantes. 
                    Selecciona un cuestionario activo para ver o agregar nuevas interrogantes.
                </p>

                <hr style="border-top: 1px dashed #eeeeee;" class="m-b-20">

                <div class="form-group text-left m-b-25">
                    <label for="cboCuestionarioGe" class="font-weight-bold text-dark">
                        <i class="fas fa-filter text-primary mr-1"></i> Cuestionario Activo
                    </label>
                    <select class="form-control form-new shadow-sm" id="cboCuestionarioGe" style="border-radius: 6px; border: 1px solid #ced4da;">
                    </select>
                </div>

                <button type="button" id="btnRegistro" class="btn btn-primary btn-lg waves-effect waves-light w-100 shadow-sm" style="border-radius: 8px;">
                    <i class="fas fa-plus-circle mr-2"></i> Agregar Pregunta
                </button>

            </div>
        </div>
    </div>

    <div class="col-lg-8">
        <div class="card bx-shadow" style="border-radius: 12px;">
            <div class="card-body p-4">
                
                <h4 class="m-t-0 m-b-30 border-bottom pb-3 text-dark">
                    <i class="fas fa-list-ul text-primary mr-2"></i> Lista de Preguntas
                </h4>

                <div class="table-responsive">
                    <table id="tbDatas" class="table table-hover table-sm m-0 w-100">
                        <thead class="bg-light text-dark">
                            <tr>
                                <th>Id</th>
                                <th style="width: 70%;">Texto de la Pregunta</th>
                                <th style="width: 20%;" class="text-center">Accion</th>
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
        <div class="modal-content" style="border-radius: 12px; overflow: hidden;">
            <div class="modal-header bg-light">
                <!-- Usamos el span interno para proteger el ícono en tu JS -->
                <h4 class="modal-title m-0 text-dark font-weight-bold">
                    <i class="fas fa-question-circle mr-2 text-primary"></i> <span id="myModalLabel">Detalle de Pregunta</span>
                </h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            
            <div class="modal-body p-4">
                <div class="form-group mb-4">
                    <label for="cboCuestionario" class="font-weight-bold text-dark">Asignar a Cuestionario</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-light"><i class="fas fa-file-alt text-muted"></i></span>
                        </div>
                        <!-- Modifiqué la clase base de bootstrap para que se vea más grande y limpio -->
                        <select class="form-control form-new" id="cboCuestionario">
                        </select>
                    </div>
                </div>
                
                <div class="form-group mb-2">
                    <label for="txtPregunta" class="font-weight-bold text-dark">Texto de la Pregunta</label>
                    <textarea class="form-control form-new" rows="4" id="txtPregunta" placeholder="Escribe aquí la pregunta de forma clara y objetiva..."></textarea>
                </div>
            </div>
            
            <div class="modal-footer bg-light" style="border-radius: 0 0 12px 12px;">
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

    <script src="js/PagePregunta.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
