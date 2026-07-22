<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="CapaPresentacion.Inicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Dashboard de Resultados
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row m-b-20">
        <!-- KPI 1: Unidades Educativas -->
        <div class="col-sm-6 col-lg-3">
            <div class="card">
                <div class="card-body">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="text-muted font-weight-light m-t-0 m-b-10">Colegios Registrados</h5>
                            <h2 class="m-t-0 m-b-5"><b id="lblTotalColegios">0</b></h2>
                            <p class="text-success m-b-0 font-13">En la plataforma</p>
                        </div>
                        <div class="ml-auto">
                            <span class="badge badge-primary p-2" style="font-size: 24px; border-radius: 8px; opacity: 0.8;">
                                <i class="fas fa-school"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- KPI 2: Estudiantes Globales -->
        <div class="col-sm-6 col-lg-3">
            <div class="card">
                <div class="card-body">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="text-muted font-weight-light m-t-0 m-b-10">Estudiantes Globales</h5>
                            <h2 class="m-t-0 m-b-5"><b id="lblTotalEstudiantes">0</b></h2>
                            <p class="text-success m-b-0 font-13">Usuarios activos</p>
                        </div>
                        <div class="ml-auto">
                            <span class="badge badge-success p-2" style="font-size: 24px; border-radius: 8px; opacity: 0.8;">
                                <i class="fa fa-users"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- KPI 3: Carreras Habilitadas -->
        <div class="col-sm-6 col-lg-3">
            <div class="card">
                <div class="card-body">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="text-muted font-weight-light m-t-0 m-b-10">Base de Carreras</h5>
                            <h2 class="m-t-0 m-b-5"><b id="lblTotalCarreras">0</b></h2>
                            <p class="text-muted m-b-0 font-13">Para sugerencias IA</p>
                        </div>
                        <div class="ml-auto">
                            <span class="badge badge-warning p-2 text-white" style="font-size: 24px; border-radius: 8px; opacity: 0.8;">
                                <i class="fa fa-book"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- KPI 4: Tests Globales -->
        <div class="col-sm-6 col-lg-3">
            <div class="card">
                <div class="card-body">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="text-muted font-weight-light m-t-0 m-b-10">Tests Realizados</h5>
                            <h2 class="m-t-0 m-b-5"><b id="lblTotalTestsGlobales">0</b></h2>
                            <p class="text-success m-b-0 font-13">Histórico nacional</p>
                        </div>
                        <div class="ml-auto">
                            <span class="badge badge-secondary p-2" style="font-size: 24px; border-radius: 8px; opacity: 0.8;">
                                <i class="fas fa-clipboard-list"></i>
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
            <a href="ListaEstudiantes.aspx" class="card text-dark waves-effect waves-light d-block">
                <div class="card-body text-center p-t-15 p-b-15">
                    <i class="fa fa-user text-primary m-r-10"></i><b>Gestionar Estudiantes</b>
                    <i class="fa fa-angle-right float-right text-muted" style="margin-top: 3px;"></i>
                </div>
            </a>
        </div>

        <div class="col-lg-4">
            <a href="PageUndsEducativas.aspx" class="card text-dark waves-effect waves-light d-block">
                <div class="card-body text-center p-t-15 p-b-15">
                    <i class="fas fa-school text-success m-r-10"></i><b>Gestionar Colegios</b>
                    <i class="fa fa-angle-right float-right text-muted" style="margin-top: 3px;"></i>
                </div>
            </a>
        </div>

        <div class="col-lg-4">
            <a href="PageDirectores.aspx" class="card text-dark waves-effect waves-light d-block">
                <div class="card-body text-center p-t-15 p-b-15">
                    <i class="fa fa-user-circle text-warning m-r-10"></i><b>Gestionar Directores</b>
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
    <script src="js/Inicio.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
