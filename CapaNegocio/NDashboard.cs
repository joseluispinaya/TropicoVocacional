using CapaDatos;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class NDashboard
    {
        #region "PATRON SINGLETON"
        private static NDashboard _instancia = null;
        private NDashboard() { }
        public static NDashboard GetInstance()
        {
            if (_instancia == null) _instancia = new NDashboard();
            return _instancia;
        }
        #endregion

        public Respuesta<EDashboard> ObtenerEstadisticasDashboard(int idUnidadEducativa)
        {
            return DDashboard.GetInstance().ObtenerEstadisticasDashboard(idUnidadEducativa);
        }

        public Respuesta<EDashboard> ObtenerEstadisticasDashboardAdmin()
        {
            return DDashboard.GetInstance().ObtenerEstadisticasDashboardAdmin();
        }

    }
}
