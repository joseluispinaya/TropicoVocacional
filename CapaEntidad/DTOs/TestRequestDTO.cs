using System.Collections.Generic;

namespace CapaEntidad.DTOs
{
    public class TestRequestDTO
    {
        public int IdEstudiante { get; set; }
        public List<ResultTestDTO> Respuestas { get; set; }
    }
}
