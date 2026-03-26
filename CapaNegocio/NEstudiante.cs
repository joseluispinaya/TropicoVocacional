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
    public class NEstudiante
    {
        #region "PATRON SINGLETON"
        private static NEstudiante instancia = null;
        private NEstudiante() { }
        public static NEstudiante GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NEstudiante();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EEstudiante>> ListarEstIdUndEd(int idUnidadEducativa)
        {
            return DEstudiante.GetInstance().ListarEstIdUndEd(idUnidadEducativa);
        }

        public Respuesta<int> RegistroEstApp(EEstudiante oModel)
        {
            return DEstudiante.GetInstance().RegistroEstApp(oModel);
        }

        public Respuesta<EEstudiante> LoginEstudiante(string Correo)
        {
            return DEstudiante.GetInstance().LoginEstudiante(Correo);
        }
    }
}
