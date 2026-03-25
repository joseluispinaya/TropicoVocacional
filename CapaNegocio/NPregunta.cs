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
    public class NPregunta
    {
        #region "PATRON SINGLETON"
        private static NPregunta instancia = null;
        private NPregunta() { }
        public static NPregunta GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NPregunta();
            }
            return instancia;
        }
        #endregion
        public Respuesta<List<EPregunta>> ListarPreguntas(int idCuestionario)
        {
            return DPregunta.GetInstance().ListarPreguntas(idCuestionario);
        }

        public Respuesta<int> GuardarOrEditPregunta(EPregunta oModel)
        {
            return DPregunta.GetInstance().GuardarOrEditPregunta(oModel);
        }
    }
}
