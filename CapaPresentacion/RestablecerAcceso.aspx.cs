using CapaEntidad.Responses;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion
{
    public partial class RestablecerAcceso : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<string> RestablecerPassword(string correo, string token, string passNueva)
        {
            try
            {
                // -------------------------------------------------------------
                // AQUI IRÁ TU LÓGICA DE VALIDACIÓN DEL TOKEN EN EL FUTURO
                // Ejemplo: Si (!ValidarToken(correo, token)) return error...
                // -------------------------------------------------------------

                var utilidades = Utilidadesj.GetInstance();

                // 1. Obtenemos el usuario usando tu método existente
                var respBD = NDirector.GetInstance().LoginDirectores(correo);

                if (!respBD.Estado || respBD.Data == null)
                {
                    return new Respuesta<string> { Estado = false, Mensaje = "El correo no se encuentra registrado en el sistema." };
                }

                var objUser = respBD.Data;

                // 2. Encriptamos la nueva contraseña y se la asignamos al objeto
                objUser.ClaveHash = utilidades.Hash(passNueva);

                // 3. Enviamos el objeto a actualizar
                var respUpdate = NDirector.GetInstance().GuardarOrEditDirector(objUser);

                if (respUpdate.Estado)
                {
                    return new Respuesta<string> { Estado = true, Mensaje = "Contraseña restablecida exitosamente." };
                }

                return new Respuesta<string> { Estado = false, Mensaje = respUpdate.Mensaje };
            }
            catch (Exception)
            {
                return new Respuesta<string> { Estado = false, Mensaje = "Error interno en el servidor." };
            }
        }

    }
}