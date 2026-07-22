<%@ Page Title="" Language="C#" MasterPageFile="~/MenuDocentes/MasterDocentes.Master" AutoEventWireup="true" CodeBehind="PanelInformes.aspx.cs" Inherits="CapaPresentacion.MenuDocentes.PanelInformes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        /* Efectos para las tarjetas estadísticas */
        .plan-card {
            transition: all 0.3s ease;
            border: 2px solid #dee2e6;
            border-radius: 12px;
        }

            .plan-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                border-color: #17a2b8;
            }

            .plan-card.plan-destacado {
                border: 2px solid #ffc107;
                position: relative;
            }

        .badge-recomendado {
            position: absolute;
            top: -14px;
            left: 50%;
            transform: translateX(-50%);
            background: #ffc107;
            color: #000;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 900;
            box-shadow: 0 4px 6px rgba(0,0,0,0.15);
        }

        .profile-img-container {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            margin: 0 auto;
            border: 3px solid #17a2b8;
            background-color: #f8f9fa;
        }

            .profile-img-container img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Informe General
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row" id="cargando">
        <!-- Columna Izquierda: Perfil del Director -->
        <div class="col-lg-4 mb-4">
            <div class="card shadow-sm border-0 h-100" style="border-top: 5px solid #17a2b8 !important;">
                <div class="card-body py-4 px-4 text-center">

                    <div class="profile-img-container mb-3">
                        <img id="imgPerfilDirector" src="../images/sinimagen.png" alt="Perfil Director" onerror="this.src='/images/sinimagen.png';">
                    </div>

                    <h5 class="font-weight-bold text-dark mb-1" id="lblInfoPropietario">Cargando...</h5>
                    <span class="badge badge-info p-1 mb-3">Director(a)</span>

                    <hr>

                    <div class="text-left">
                        <div class="mb-3">
                            <small class="text-muted d-block"><i class="fas fa-school mr-1 text-primary"></i>Unidad Educativa:</small>
                            <span class="font-weight-bold text-dark" id="lblInfoTienda" style="font-size: 1.1rem;">Cargando...</span>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <small class="text-muted d-block"><i class="fas fa-id-card mr-1 text-secondary"></i>Nro CI:</small>
                                <span class="text-dark font-weight-bold" id="lblInfoCI">Cargando...</span>
                            </div>
                            <div class="col-md-6 mb-3">
                                <small class="text-muted d-block"><i class="fas fa-mobile-alt mr-1 text-secondary"></i>Celular:</small>
                                <span class="text-dark font-weight-bold" id="lblInfoCelular">Cargando...</span>
                            </div>
                        </div>

                        <div class="mb-3">
                            <small class="text-muted d-block"><i class="fas fa-envelope mr-1 text-secondary"></i>Correo:</small>
                            <span class="text-dark font-weight-bold" id="lblInfoCorreo">Cargando...</span>
                        </div>

                        <div class="mb-3">
                            <small class="text-muted d-block mb-1">Estado en Sistema:</small>
                            <span class="badge badge-success p-2" id="lblInfoEstado" style="font-size: 0.8rem;">
                                <i class="fas fa-check-circle mr-1"></i>ACTIVO
                            </span>
                        </div>
                    </div>

                    <hr>

                    <!-- Botón para generar el reporte general -->
                    <button id="btnReporte" type="button" class="btn btn-primary btn-block shadow-sm waves-effect waves-light mt-3">
                        <i class="fas fa-file-pdf mr-2"></i>Generar Reporte General
                    </button>
                </div>
            </div>
        </div>

        <!-- Columna Derecha: Indicadores del Dashboard -->
        <div class="col-lg-8 mb-4">
            <div class="card shadow-sm border-0 h-100" style="border-top: 5px solid #ffc107 !important;">
                <div class="card-body py-2 px-4">

                    <h5 class="font-weight-bold text-dark mb-4 border-bottom pb-2">
                        <i class="fas fa-chart-line mr-2 text-warning"></i>Resumen Estadístico de Unidad Educativa
                    </h5>

                    <div class="row">
                        <!-- Tarjeta 1: Estudiantes Evaluados -->
                        <div class="col-md-6 mb-3">
                            <div class="card bg-light plan-card h-100 text-center p-3">
                                <div class="text-success mb-2"><i class="fas fa-user-graduate fa-2x"></i></div>
                                <h6 class="text-muted font-weight-bold mb-2">ESTUDIANTES EVALUADOS</h6>
                                <h2 class="font-weight-bold text-dark mb-1" id="lblEstudiantesEvaluados">0</h2>
                                <small class="text-muted">Total de alumnos en el sistema</small>
                            </div>
                        </div>

                        <!-- Tarjeta 2: Tests Realizados -->
                        <div class="col-md-6 mb-3">
                            <div class="card bg-light plan-card h-100 text-center p-3">
                                <div class="text-primary mb-2"><i class="fas fa-file-alt fa-2x"></i></div>
                                <h6 class="text-muted font-weight-bold mb-2">TESTS REALIZADOS</h6>
                                <h2 class="font-weight-bold text-dark mb-1" id="lblTotalTests">0</h2>
                                <small class="text-muted">Pruebas completadas</small>
                            </div>
                        </div>

                        <!-- Tarjeta 3: Carreras Destacadas (Destacado visualmente) -->
                        <div class="col-md-6 mb-3">
                            <div class="card bg-white plan-card plan-destacado shadow-sm h-100 text-center p-3">
                                <span class="badge-recomendado">MODELO IA</span>
                                <div class="text-warning mb-2 mt-2"><i class="fas fa-star fa-2x"></i></div>
                                <h6 class="text-muted font-weight-bold mb-2">CARRERAS DESTACADAS</h6>
                                <h2 class="font-weight-bold text-dark mb-1" id="lblCarrerasDestacadas">0</h2>
                                <small class="text-muted">Diferentes carreras sugeridas</small>
                            </div>
                        </div>

                        <!-- Tarjeta 4: Recomendaciones -->
                        <div class="col-md-6 mb-3">
                            <div class="card bg-light plan-card h-100 text-center p-3">
                                <div class="text-info mb-2"><i class="fas fa-chart-bar fa-2x"></i></div>
                                <h6 class="text-muted font-weight-bold mb-2">TOTAL RECOMENDACIONES</h6>
                                <h2 class="font-weight-bold text-dark mb-1" id="lblTotalRecomendaciones">0</h2>
                                <small class="text-muted">Sugerencias emitidas</small>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>
    <script src="jsDirector/PanelInformes.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
