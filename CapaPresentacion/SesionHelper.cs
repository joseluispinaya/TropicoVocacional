using CapaEntidad.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CapaPresentacion
{
    public class SesionHelper
    {
        // Usamos una propiedad estática (get) para un código más limpio
        public static EDirector UsuarioLogueado
        {
            get
            {
                if (HttpContext.Current.Session["UsuarioLogueado"] == null)
                    return null;

                return (EDirector)HttpContext.Current.Session["UsuarioLogueado"];
            }
        }
    }
}