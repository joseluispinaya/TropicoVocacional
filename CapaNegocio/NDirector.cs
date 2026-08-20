using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;

namespace CapaNegocio
{
    public class NDirector
    {
        #region "PATRON SINGLETON"
        private static NDirector instancia = null;
        private NDirector() { }
        public static NDirector GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NDirector();
            }
            return instancia;
        }
        #endregion

        public Respuesta<int> GuardarOrEditDirector(EDirector oModel)
        {
            return DDirector.GetInstance().GuardarOrEditDirector(oModel);
        }

        public Respuesta<List<EDirector>> ListaDirectores(int idDirector)
        {
            return DDirector.GetInstance().ListaDirectores(idDirector);
        }

        public Respuesta<EDirector> ObtenerDirectorPorId(int idDirector)
        {
            return DDirector.GetInstance().ObtenerDirectorPorId(idDirector);
        }

        public Respuesta<EDirector> LoginDirectores(string Correo)
        {
            return DDirector.GetInstance().LoginDirectores(Correo);
        }

        public Respuesta<EDirector> LoginSuperAdmin(string Correo)
        {
            var usuarioPrueba = "admindev@yopmail.com";

            if (usuarioPrueba.ToLower() != Correo.Trim().ToLower())
            {
                return new Respuesta<EDirector>
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Usuario o Contraseña incorrectos."
                };
            }


            EDirector obj = new EDirector
            {
                IdDirector = 1019,
                IdUnidadEducativa = 0,
                Nombres = "Juan Carlos",
                Apellidos = "Luna Paz",
                NroCi = "32547854",
                Celular = "73999748",
                Correo = "admindev@yopmail.com",
                ClaveHash = "123456789",
                Photo = "/images/logodefault.png",
                Estado = true,
                NombreUnidadEducativa = "Administrador"
            };

            return new Respuesta<EDirector>
            {
                Estado = true,
                Data = obj,
                Mensaje = "Bienvenido al sistema"
            };

        }

    }
}
