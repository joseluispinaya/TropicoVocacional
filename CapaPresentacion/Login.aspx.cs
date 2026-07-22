using CapaEntidad.DTOs;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.AppendHeader("Cache-Control", "no-store");
        }

        [WebMethod]
        public static Respuesta<EUsuarios> LoginUsuario(string Correo, string Clave)
        {
            try
            {
                var resp = NUsuarios.GetInstance().LoginUsuario(Correo);

                if (!resp.Estado || resp.Data == null)
                {
                    return new Respuesta<EUsuarios>
                    {
                        Estado = false,
                        Mensaje = "Usuario o Contraseña incorrectos." // Mensaje genérico por seguridad
                    };
                }

                var objUser = resp.Data;

                // 2. Validar Contraseña (Simulación directa vs Hash real)
                // NOTA: Cuando pases a producción, aquí usarás: BCrypt.Net.BCrypt.Verify(Clave, objUser.ClaveHash)
                if (Clave != objUser.ClaveHash)
                {
                    return new Respuesta<EUsuarios> { Estado = false, Mensaje = "Usuario o Contraseña incorrectos." };
                }

                // 3. Validar Estado
                if (!objUser.Estado)
                {
                    return new Respuesta<EUsuarios> { Estado = false, Mensaje = "Su cuenta se encuentra inactiva." };
                }

                objUser.ClaveHash = "";

                return new Respuesta<EUsuarios>
                {
                    Estado = true,
                    Data = objUser,
                    Mensaje = "Bienvenido al sistema"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EUsuarios>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<EDirector> InicioSesion(string Correo, string Clave)
        {
            Respuesta<EDirector> response = new Respuesta<EDirector>();

            try
            {
                // 1. OrdinalIgnoreCase soluciona el problema de mayúsculas/minúsculas
                bool esAdmin = string.Equals(Correo.Trim(), "admindev@yopmail.com", StringComparison.OrdinalIgnoreCase);

                if (esAdmin)
                {
                    // sesion como super admin
                    response = LoginSuperAdmin(Correo, Clave);
                }
                else
                {
                    // sesion como director
                    response = LoginDirectores(Correo, Clave);
                }

            }
            catch (Exception ex)
            {
                response.Estado = false;
                response.Mensaje = "Ocurrió un error: " + ex.Message;
            }

            return response;
        }

        private static Respuesta<EDirector> LoginDirectores(string correo, string clave)
        {
            try
            {
                var resp = NDirector.GetInstance().LoginDirectores(correo);

                if (!resp.Estado || resp.Data == null)
                {
                    return new Respuesta<EDirector> { Estado = false, Mensaje = resp.Mensaje };
                }

                var objUser = resp.Data;

                // Validar Estado
                if (!objUser.Estado)
                {
                    return new Respuesta<EDirector> { Estado = false, Mensaje = "Su cuenta se encuentra inactiva." };
                }

                // Verificamos la contraseña (BCrypt)
                bool passCorrecta = Utilidadesj.GetInstance().Verify(clave, objUser.ClaveHash);

                if (!passCorrecta)
                {
                    return new Respuesta<EDirector> { Estado = false, Mensaje = "Correo o Contraseña incorrectos." };
                }

                // Seguridad: Limpiamos la clave antes de guardarla en sesión
                objUser.ClaveHash = "";

                // Guardamos en sesión el objeto limpio
                HttpContext.Current.Session["UsuarioLogueado"] = objUser;
                HttpContext.Current.Session["TipoUsuario"] = "UsuarioDirector";

                return new Respuesta<EDirector>
                {
                    Estado = true,
                    Data = objUser,
                    Valor = "MenuDocentes/PanelInicio.aspx",
                    Mensaje = "Bienvenido al sistema"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EDirector> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        private static Respuesta<EDirector> LoginSuperAdmin(string correo, string clave)
        {
            try
            {
                var resp = NDirector.GetInstance().LoginSuperAdmin(correo);

                if (!resp.Estado || resp.Data == null)
                {
                    return new Respuesta<EDirector> { Estado = false, Mensaje = resp.Mensaje };
                }

                var objUser = resp.Data;

                if (clave != objUser.ClaveHash)
                {
                    return new Respuesta<EDirector> { Estado = false, Mensaje = "Correo o Contraseña incorrectos." };
                }

                // Seguridad: Limpiamos la clave antes de guardarla en sesión 
                objUser.ClaveHash = "";

                // Guardamos en sesión el objeto limpio
                HttpContext.Current.Session["UsuarioLogueado"] = objUser;
                HttpContext.Current.Session["TipoUsuario"] = "SuperAdmin";

                return new Respuesta<EDirector>
                {
                    Estado = true,
                    Data = objUser,
                    Valor = "Inicio.aspx",
                    Mensaje = "Bienvenido al sistema"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EDirector> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

    }
}