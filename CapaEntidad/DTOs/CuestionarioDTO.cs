using System.Collections.Generic;

namespace CapaEntidad.DTOs
{
    public class CuestionarioDTO
    {
        public int IdCuestionario { get; set; }
        public string Titulo { get; set; }
        public List<PreguntaTestDTO> Preguntas { get; set; } = new List<PreguntaTestDTO>();
    }
}
