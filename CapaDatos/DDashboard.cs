using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class DDashboard
    {
        #region "PATRON SINGLETON"
        private static DDashboard _instancia = null;
        private DDashboard() { }
        public static DDashboard GetInstance()
        {
            if (_instancia == null) _instancia = new DDashboard();
            return _instancia;
        }
        #endregion

        public Respuesta<EDashboard> ObtenerEstadisticasDashboard(int idUnidadEducativa)
        {
            try
            {
                EDashboard objDashboard = new EDashboard();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_Dashboard_Estadisticas", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdUnidadEducativa", idUnidadEducativa);

                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            // =======================================================
                            // RESULTADO 1: Tarjetas Superiores (KPIs)
                            // =======================================================
                            if (dr.Read())
                            {
                                objDashboard.KPIs.TotalTests = dr["TotalTests"] != DBNull.Value ? Convert.ToInt32(dr["TotalTests"]) : 0;
                                objDashboard.KPIs.EstudiantesEvaluados = dr["EstudiantesEvaluados"] != DBNull.Value ? Convert.ToInt32(dr["EstudiantesEvaluados"]) : 0;
                                objDashboard.KPIs.CarrerasDestacadas = dr["CarrerasDestacadas"] != DBNull.Value ? Convert.ToInt32(dr["CarrerasDestacadas"]) : 0;
                                objDashboard.KPIs.TotalRecomendaciones = dr["TotalRecomendaciones"] != DBNull.Value ? Convert.ToInt32(dr["TotalRecomendaciones"]) : 0;
                            }

                            // =======================================================
                            // RESULTADO 2: Gráfico de Dona (Top 4 Carreras más frecuentes)
                            // =======================================================
                            if (dr.NextResult())
                            {
                                while (dr.Read())
                                {
                                    objDashboard.GraficoDona.Add(new ECarreraCantidad
                                    {
                                        Carrera = dr["Carrera"].ToString(),
                                        Cantidad = Convert.ToInt32(dr["Cantidad"])
                                    });
                                }
                            }

                            // =======================================================
                            // RESULTADO 3: Gráfico de Barras (Distribución de Afinidad)
                            // =======================================================
                            if (dr.NextResult())
                            {
                                if (dr.Read())
                                {
                                    objDashboard.GraficoBarras.Alto = dr["Alto"] != DBNull.Value ? Convert.ToInt32(dr["Alto"]) : 0;
                                    objDashboard.GraficoBarras.Medio = dr["Medio"] != DBNull.Value ? Convert.ToInt32(dr["Medio"]) : 0;
                                    objDashboard.GraficoBarras.Bajo = dr["Bajo"] != DBNull.Value ? Convert.ToInt32(dr["Bajo"]) : 0;
                                }
                            }

                            // =======================================================
                            // RESULTADO 4: Top Recomendaciones IA (Progress Bars)
                            // =======================================================
                            if (dr.NextResult())
                            {
                                while (dr.Read())
                                {
                                    objDashboard.TopRecomendaciones.Add(new ECarreraPromedio
                                    {
                                        Carrera = dr["Carrera"].ToString(),
                                        Promedio = Convert.ToDecimal(dr["Promedio"])
                                    });
                                }
                            }
                        }
                    }
                }

                return new Respuesta<EDashboard>()
                {
                    Estado = true,
                    Valor = "",
                    Data = objDashboard,
                    Mensaje = "Estadísticas obtenidas correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EDashboard>()
                {
                    Estado = false,
                    Valor = "",
                    Data = null,
                    Mensaje = "Error al obtener las estadísticas: " + ex.Message
                };
            }
        }

        public Respuesta<EDashboard> ObtenerEstadisticasDashboardAdmin()
        {
            try
            {
                EDashboard objDashboard = new EDashboard();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_Dashboard_SuperAdmin", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;

                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            // =======================================================
                            // RESULTADO 1: Tarjetas Superiores (KPIs)
                            // =======================================================
                            if (dr.Read())
                            {
                                // total colegio en total test
                                objDashboard.KPIs.TotalTests = dr["TotalColegios"] != DBNull.Value ? Convert.ToInt32(dr["TotalColegios"]) : 0;
                                objDashboard.KPIs.EstudiantesEvaluados = dr["TotalEstudiantes"] != DBNull.Value ? Convert.ToInt32(dr["TotalEstudiantes"]) : 0;
                                objDashboard.KPIs.CarrerasDestacadas = dr["TotalCarreras"] != DBNull.Value ? Convert.ToInt32(dr["TotalCarreras"]) : 0;
                                objDashboard.KPIs.TotalRecomendaciones = dr["TotalTestsGlobales"] != DBNull.Value ? Convert.ToInt32(dr["TotalTestsGlobales"]) : 0;
                            }

                            // =======================================================
                            // RESULTADO 2: Gráfico de Dona (Top 4 Carreras más frecuentes)
                            // =======================================================
                            if (dr.NextResult())
                            {
                                while (dr.Read())
                                {
                                    objDashboard.GraficoDona.Add(new ECarreraCantidad
                                    {
                                        Carrera = dr["Carrera"].ToString(),
                                        Cantidad = Convert.ToInt32(dr["Cantidad"])
                                    });
                                }
                            }

                            // =======================================================
                            // RESULTADO 3: Gráfico de Barras (Distribución de Afinidad)
                            // =======================================================
                            if (dr.NextResult())
                            {
                                if (dr.Read())
                                {
                                    objDashboard.GraficoBarras.Alto = dr["Alto"] != DBNull.Value ? Convert.ToInt32(dr["Alto"]) : 0;
                                    objDashboard.GraficoBarras.Medio = dr["Medio"] != DBNull.Value ? Convert.ToInt32(dr["Medio"]) : 0;
                                    objDashboard.GraficoBarras.Bajo = dr["Bajo"] != DBNull.Value ? Convert.ToInt32(dr["Bajo"]) : 0;
                                }
                            }

                            // =======================================================
                            // RESULTADO 4: Top Recomendaciones IA (Progress Bars)
                            // =======================================================
                            if (dr.NextResult())
                            {
                                while (dr.Read())
                                {
                                    objDashboard.TopRecomendaciones.Add(new ECarreraPromedio
                                    {
                                        Carrera = dr["Carrera"].ToString(),
                                        Promedio = Convert.ToDecimal(dr["Promedio"])
                                    });
                                }
                            }
                        }
                    }
                }

                return new Respuesta<EDashboard>()
                {
                    Estado = true,
                    Valor = "",
                    Data = objDashboard,
                    Mensaje = "Estadísticas obtenidas correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EDashboard>()
                {
                    Estado = false,
                    Valor = "",
                    Data = null,
                    Mensaje = "Error al obtener las estadísticas: " + ex.Message
                };
            }
        }

    }
}
