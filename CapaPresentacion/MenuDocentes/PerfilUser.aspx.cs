using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion.MenuDocentes
{
    public partial class PerfilUser : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<EDirector> GuardarCambiosPerfil(EDirector objeto, string base64Image)
        {
            // Obtenemos el usuario director guardado en sesión
            var userDirector = SesionHelper.UsuarioLogueado;

            if (userDirector == null)
                return new Respuesta<EDirector> { Estado = false, Valor = "warning", Mensaje = "Sesión expirada. Vuelva a iniciar sesión." };

            try
            {
                var utilidades = Utilidadesj.GetInstance();

                // 1. Asignamos las llaves maestras DESDE LA SESIÓN al objeto (Evita hackeos desde el frontend)
                objeto.IdDirector = userDirector.IdDirector;
                objeto.IdUnidadEducativa = userDirector.IdUnidadEducativa;

                // 2. Manejo de la foto
                if (!string.IsNullOrEmpty(base64Image))
                {
                    byte[] imageBytes = Convert.FromBase64String(base64Image);
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/Imagenes/";
                        objeto.Photo = utilidades.UploadPhoto(stream, folder);
                    }
                }
                else
                {
                    objeto.Photo = ""; // El SP conservará la foto antigua
                }

                // Ejecutamos la actualización en la base de datos
                var respDB = NDirector.GetInstance().GuardarOrEditDirector(objeto);

                if (respDB.Estado)
                {
                    // 3. Actualizamos la sesión activa en el SERVIDOR
                    userDirector.Nombres = objeto.Nombres;
                    userDirector.Apellidos = objeto.Apellidos;
                    userDirector.NroCi = objeto.NroCi;
                    userDirector.Celular = objeto.Celular;
                    userDirector.Correo = objeto.Correo;

                    if (!string.IsNullOrEmpty(objeto.Photo))
                    {
                        userDirector.Photo = objeto.Photo;
                    }

                    // Sobrescribimos la sesión para asegurarnos al 100% que los cambios se guarden
                    HttpContext.Current.Session["UsuarioLogueado"] = userDirector;

                    // 4. Retornamos el objeto actualizado al CLIENTE
                    return new Respuesta<EDirector>
                    {
                        Estado = true,
                        Valor = "success",
                        Mensaje = "Perfil actualizado correctamente.",
                        Data = userDirector
                    };
                }

                return new Respuesta<EDirector> { Estado = false, Valor = respDB.Valor, Mensaje = respDB.Mensaje };
            }
            catch (Exception)
            {
                return new Respuesta<EDirector> { Estado = false, Valor = "error", Mensaje = "Error interno en el servidor." };
            }
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<string> ActualizarPassword(string passActual, string passNueva)
        {
            var userDirector = SesionHelper.UsuarioLogueado;

            if (userDirector == null)
                return new Respuesta<string> { Estado = false, Valor = "warning", Mensaje = "Sesión expirada." };

            try
            {
                var utilidades = Utilidadesj.GetInstance();

                // 1. Reutilizamos el método de Login para obtener el Hash real de la BD
                var respBD = NDirector.GetInstance().LoginDirectores(userDirector.Correo);

                if (!respBD.Estado || respBD.Data == null)
                {
                    return new Respuesta<string> { Estado = false, Valor = "warning", Mensaje = "Usuario no identificado en la base de datos." };
                }

                // 2. Verificamos la contraseña actual usando el hash obtenido
                bool passCorrecta = utilidades.Verify(passActual, respBD.Data.ClaveHash);

                if (!passCorrecta)
                {
                    return new Respuesta<string> { Estado = false, Valor = "warning", Mensaje = "La contraseña actual es incorrecta." };
                }

                // 3. Encriptar la nueva contraseña
                string nuevoHash = utilidades.Hash(passNueva);

                // 4. Armar el objeto para actualizar (mantenemos los datos de la sesión, solo cambiamos la clave)
                EDirector objClave = new EDirector
                {
                    IdDirector = userDirector.IdDirector,
                    IdUnidadEducativa = userDirector.IdUnidadEducativa,
                    Nombres = userDirector.Nombres,
                    Apellidos = userDirector.Apellidos,
                    NroCi = userDirector.NroCi,
                    Celular = userDirector.Celular,
                    Correo = userDirector.Correo,
                    ClaveHash = nuevoHash,
                    Photo = userDirector.Photo
                };

                // 5. Guardar los cambios
                var respUpdate = NDirector.GetInstance().GuardarOrEditDirector(objClave);

                if (respUpdate.Estado)
                {
                    return new Respuesta<string> { Estado = true, Valor = "success", Mensaje = "Contraseña actualizada." };
                }

                return new Respuesta<string> { Estado = false, Valor = respUpdate.Valor, Mensaje = respUpdate.Mensaje };
            }
            catch (Exception)
            {
                return new Respuesta<string> { Estado = false, Valor = "error", Mensaje = "Error interno en el servidor." };
            }
        }

    }
}