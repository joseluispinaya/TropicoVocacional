using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;

namespace CapaDatos
{
    public class DRespuesta
    {
        #region "PATRON SINGLETON"
        private static DRespuesta instancia = null;
        private DRespuesta() { }
        public static DRespuesta GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DRespuesta();
            }
            return instancia;
        }
        #endregion

        public Respuesta<int> RegistrarTest(int idEstudiante, string respuestasJson)
        {
            var respuesta = new Respuesta<int>();

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                using (SqlCommand cmd = new SqlCommand("sp_RegistrarTestYRespuestas", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Parámetros de entrada
                    cmd.Parameters.Add("@IdEstudiante", SqlDbType.Int).Value = idEstudiante;
                    cmd.Parameters.Add("@RespuestasJSON", SqlDbType.NVarChar).Value = respuestasJson;

                    // Parámetro de salida (OUTPUT)
                    var paramIdGenerado = new SqlParameter("@IdTestGenerado", SqlDbType.Int)
                    {
                        Direction = ParameterDirection.Output
                    };
                    cmd.Parameters.Add(paramIdGenerado);

                    con.Open();
                    cmd.ExecuteNonQuery();

                    // Obtenemos el valor retornado por el procedimiento
                    int idGenerado = Convert.ToInt32(paramIdGenerado.Value);

                    if (idGenerado > 0)
                    {
                        respuesta.Estado = true;
                        respuesta.Data = idGenerado; // Guardamos el ID para usarlo luego
                        respuesta.Mensaje = "Test y respuestas registrados correctamente.";
                    }
                    else
                    {
                        respuesta.Estado = false;
                        respuesta.Data = 0;
                        respuesta.Mensaje = "Error interno en la base de datos al registrar el test.";
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Estado = false;
                respuesta.Data = 0;
                respuesta.Mensaje = $"Error de BD: {ex.Message}";
            }

            return respuesta;
        }
    }
}
