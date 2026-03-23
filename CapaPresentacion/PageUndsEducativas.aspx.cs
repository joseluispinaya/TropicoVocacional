using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class PageUndsEducativas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EUnidadEducativa>> ListaUndEducativas()
        {
            return NUnidadEducativa.GetInstance().ListaUndEducativas();
        }

        [WebMethod]
        public static Respuesta<List<EUnidadEducativa>> ListaUndEducativasDisponibles(int IdUnidadEdu)
        {
            return NUnidadEducativa.GetInstance().ListaUndEducativasDisponibles(IdUnidadEdu);
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditUnidadesEdu(EUnidadEducativa objeto)
        {
            return NUnidadEducativa.GetInstance().GuardarOrEditUnidadesEdu(objeto);
        }
    }
}