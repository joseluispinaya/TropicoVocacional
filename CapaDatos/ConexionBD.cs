using System.Configuration;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class ConexionBD
    {
        #region "PATRON SINGLETON"
        private static ConexionBD conexion = null;

        private ConexionBD() { }

        public static ConexionBD GetInstance()
        {
            if (conexion == null)
            {
                conexion = new ConexionBD();
            }
            return conexion;
        }
        #endregion

        

        public SqlConnection ConexionDB()
        {
            // Lee la cadena directamente del web.config
            string cadena = ConfigurationManager.ConnectionStrings["CadenaConexion"].ConnectionString;
            SqlConnection conexion = new SqlConnection(cadena);

            return conexion;
        }

        //public SqlConnection ConexionDB()
        //{
        //    SqlConnection conexion = new SqlConnection
        //    {
        //        ConnectionString = "Data Source=.;Initial Catalog=TropVocacionalBD;Integrated Security=True"
        //    };

        //    return conexion;
        //}
    }
}
