<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="CapaPresentacion.Inicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Dashboard de Resultados
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row m-b-20">
        <div class="col-sm-6 col-lg-3">
            <div class="card">
                <div class="card-body">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="text-muted font-weight-light m-t-0 m-b-10">Tests realizados</h5>
                            <h2 class="m-t-0 m-b-5"><b>532</b></h2>
                            <p class="text-success m-b-0 font-13">+12% este mes</p>
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
                            <h2 class="m-t-0 m-b-5"><b>1,250</b></h2>
                            <p class="text-success m-b-0 font-13">+8% este mes</p>
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
                            <h5 class="text-muted font-weight-light m-t-0 m-b-10">Áreas destacadas</h5>
                            <h2 class="m-t-0 m-b-5"><b>4</b></h2>
                            <p class="text-muted m-b-0 font-13">Sin cambio</p>
                        </div>
                        <div class="ml-auto">
                            <span class="badge badge-warning p-2 text-white" style="font-size: 24px; border-radius: 8px; opacity: 0.8;">
                                <i class="fa fa-users"></i>
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
                            <h5 class="text-muted font-weight-light m-t-0 m-b-10">Recomendaciones</h5>
                            <h2 class="m-t-0 m-b-5"><b>318</b></h2>
                            <p class="text-success m-b-0 font-13">+15% este mes</p>
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
            <a href="#" class="card text-dark">
                <div class="card-body text-center p-t-15 p-b-15">
                    <i class="fa fa-user text-primary m-r-10"></i><b>Agregar Estudiante</b> <i class="fa fa-angle-down float-right text-muted"></i>
                </div>
            </a>
        </div>
        <div class="col-lg-4">
            <a href="#" class="card text-dark">
                <div class="card-body text-center p-t-15 p-b-15">
                    <i class="fas fa-school text-success m-r-10"></i><b>Agregar Colegio</b> <i class="fa fa-angle-down float-right text-muted"></i>
                </div>
            </a>
        </div>
        <div class="col-lg-4">
            <a href="#" class="card text-dark">
                <div class="card-body text-center p-t-15 p-b-15">
                    <i class="fa fa-user-circle text-warning m-r-10"></i><b>Agregar Director</b> <i class="fa fa-angle-down float-right text-muted"></i>
                </div>
            </a>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="m-b-30 m-t-0">Resultados por área</h4>
                    <div style="position: relative; height: 260px; width: 100%;">
                        <canvas id="resultadosAreaChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="m-b-30 m-t-0">Distribución de resultados</h4>
                    <div style="position: relative; height: 260px; width: 100%;">
                        <canvas id="distribucionResultadosChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="m-b-30 m-t-0">Top recomendaciones IA</h4>

                    <p class="font-600 m-b-5">Psicología <span class="text-dark float-right"><b>85%</b></span></p>
                    <div class="progress m-b-20 progress-sm">
                        <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style="width: 85%;"></div>
                    </div>

                    <p class="font-600 m-b-5">Ingeniería de Sistemas <span class="text-dark float-right"><b>78%</b></span></p>
                    <div class="progress m-b-20 progress-sm">
                        <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100" style="width: 78%;"></div>
                    </div>

                    <p class="font-600 m-b-5">Medicina <span class="text-dark float-right"><b>72%</b></span></p>
                    <div class="progress m-b-20 progress-sm">
                        <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" style="width: 72%;"></div>
                    </div>

                    <p class="font-600 m-b-5">Diseño Gráfico <span class="text-dark float-right"><b>65%</b></span></p>
                    <div class="progress m-b-20 progress-sm">
                        <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style="width: 65%;"></div>
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
