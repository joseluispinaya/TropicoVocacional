<%@ Page Title="" Language="C#" MasterPageFile="~/MenuDocentes/MasterDocentes.Master" AutoEventWireup="true" CodeBehind="PanelInicio.aspx.cs" Inherits="CapaPresentacion.MenuDocentes.PanelInicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Dashboard para Directores
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row m-b-20">
        <div class="col-sm-6 col-lg-3">
            <div class="card">
                <div class="card-body">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="text-muted font-weight-light m-t-0 m-b-10">Tests realizados</h5>
                            <h2 class="m-t-0 m-b-5"><b id="lblTotalTests">0</b></h2>
                            <p class="text-success m-b-0 font-13">Histórico general</p>
                        </div>
                        <div class="ml-auto">
                            <span class="badge badge-primary p-2" style="font-size: 24px; border-radius: 8px; opacity: 0.8;">
                                <i class="fas fa-file-alt"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="card">
                <div class="card-body">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="text-muted font-weight-light m-t-0 m-b-10">Estudiantes evaluados</h5>
                            <h2 class="m-t-0 m-b-5"><b id="lblEstudiantesEvaluados">0</b></h2>
                            <p class="text-success m-b-0 font-13">Únicos en el sistema</p>
                        </div>
                        <div class="ml-auto">
                            <span class="badge badge-success p-2" style="font-size: 24px; border-radius: 8px; opacity: 0.8;">
                                <i class="fa fa-graduation-cap"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="card">
                <div class="card-body">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="text-muted font-weight-light m-t-0 m-b-10">Carreras destacadas</h5>
                            <h2 class="m-t-0 m-b-5"><b id="lblCarrerasDestacadas">0</b></h2>
                            <p class="text-muted m-b-0 font-13">Sugeridas por IA</p>
                        </div>
                        <div class="ml-auto">
                            <span class="badge badge-warning p-2 text-white" style="font-size: 24px; border-radius: 8px; opacity: 0.8;">
                                <i class="fa fa-star"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-lg-3">
            <div class="card">
                <div class="card-body">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="text-muted font-weight-light m-t-0 m-b-10">Detalle Historial</h5>
                            <h2 class="m-t-0 m-b-5"><b id="lblTotalRecomendaciones">0</b></h2>
                            <p class="text-success m-b-0 font-13">En total</p>
                        </div>
                        <div class="ml-auto">
                            <span class="badge badge-secondary p-2" style="font-size: 24px; border-radius: 8px; opacity: 0.8;">
                                <i class="fas fa-chart-bar"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row m-b-20">
        <div class="col-lg-4">
            <!-- Reemplaza el href con tu página real -->
            <a href="PanelListaEstudiantes.aspx" class="card text-dark waves-effect waves-light d-block">
                <div class="card-body text-center p-t-15 p-b-15">
                    <i class="fa fa-user text-primary m-r-10"></i><b>Lista de Estudiantes</b>
                    <i class="fa fa-angle-right float-right text-muted" style="margin-top: 3px;"></i>
                </div>
            </a>
        </div>

        <div class="col-lg-4">
            <a href="PanelEstudiantes.aspx" class="card text-dark waves-effect waves-light d-block">
                <div class="card-body text-center p-t-15 p-b-15">
                    <i class="fas fa-address-book text-success m-r-10"></i><b>Ver Historial</b>
                    <i class="fa fa-angle-right float-right text-muted" style="margin-top: 3px;"></i>
                </div>
            </a>
        </div>

        <div class="col-lg-4">
            <a href="PanelInformes.aspx" class="card text-dark waves-effect waves-light d-block">
                <div class="card-body text-center p-t-15 p-b-15">
                    <i class="fas fa-file-alt text-warning m-r-10"></i><b>Informe</b>
                    <i class="fa fa-angle-right float-right text-muted" style="margin-top: 3px;"></i>
                </div>
            </a>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="m-b-30 m-t-0">Top 4 Carreras Recomendadas</h4>
                    <div style="position: relative; height: 260px; width: 100%;">
                        <canvas id="resultadosAreaChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="m-b-30 m-t-0">Nivel de Afinidad (IA)</h4>
                    <div style="position: relative; height: 260px; width: 100%;">
                        <canvas id="distribucionResultadosChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="m-b-30 m-t-0">Promedio de Afinidad</h4>
                    <!-- AQUÍ INYECTAREMOS EL HTML DINÁMICO -->
                    <div id="contenedorTopRecomendaciones" style="min-height: 260px;">
                        <div class="text-center text-muted m-t-40">
                            <i class="fa fa-spinner fa-spin fa-2x"></i>
                            <p>Cargando datos...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="jsDirector/PanelInicio.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
