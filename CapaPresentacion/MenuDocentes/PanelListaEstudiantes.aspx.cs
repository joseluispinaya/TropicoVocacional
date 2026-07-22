using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion.MenuDocentes
{
    public partial class PanelListaEstudiantes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<List<EEstudiante>> ListarEstIdUndEd()
        {
            var usuario = SesionHelper.UsuarioLogueado;

            if (usuario == null)
                return new Respuesta<List<EEstudiante>> { Estado = false, Mensaje = "Sesión expirada" };

            try
            {
                return NEstudiante.GetInstance().ListarEstIdUndEd(usuario.IdUnidadEducativa);
            }
            catch (Exception)
            {
                return new Respuesta<List<EEstudiante>> { Estado = false, Mensaje = "Ocurrió un error interno en el servidor. Intente nuevamente" };
            }
        }

    }
}