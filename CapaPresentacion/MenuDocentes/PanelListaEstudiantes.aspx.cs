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

        [WebMethod(EnableSession = true)]
        public static Respuesta<bool> CambiarAprobacion(int idEstudiante, bool estado, string correo, string estudiante)
        {
            if (SesionHelper.UsuarioLogueado == null)
                return new Respuesta<bool> { Estado = false, Mensaje = "Sesión expirada" };

            try
            {
                var respDB = NEstudiante.GetInstance().CambiarAprobacion(idEstudiante, estado);

                if (respDB.Estado)
                {
                    string textoAccion = estado ? "APROBADO" : "REVOCADO";

                    // Invocar el envío de correo
                    bool correoEnviado = Utilidadesj.GetInstance().NotificarAcceso(
                        correo,
                        "Notificación de Acceso - Sistema Vocacional",
                        estudiante,
                        textoAccion
                    );

                    // Mensaje dinámico dependiendo de si el SMTP logró enviar el correo
                    string mensajeFinal = correoEnviado
                        ? $"Acceso {textoAccion.ToLower()} y notificado por correo."
                        : $"Acceso {textoAccion.ToLower()}, pero falló el envío del correo.";

                    return new Respuesta<bool>
                    {
                        Estado = true,
                        Mensaje = mensajeFinal
                    };
                }

                return new Respuesta<bool> { Estado = false, Mensaje = "No se pudo actualizar el estado del estudiante." };
            }
            catch (Exception)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Error interno del servidor." };
            }
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<bool> CambiarAprobacionDos(int idEstudiante, bool estado)
        {
            // Validación de seguridad básica (Opcional, pero recomendada)
            if (SesionHelper.UsuarioLogueado == null)
                return new Respuesta<bool> { Estado = false, Mensaje = "Sesión expirada" };

            try
            {
                var respDB = NEstudiante.GetInstance().CambiarAprobacion(idEstudiante, estado);

                if (respDB.Estado)
                {
                    string textoAccion = estado ? "aprobado" : "revocado";
                    return new Respuesta<bool>
                    {
                        Estado = true,
                        Mensaje = $"El acceso ha sido {textoAccion} correctamente."
                    };
                }

                return new Respuesta<bool> { Estado = false, Mensaje = "No se pudo actualizar el estado del estudiante." };
            }
            catch (Exception)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Error interno del servidor." };
            }
        }

    }
}