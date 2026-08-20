using System.Collections.Generic;

namespace CapaEntidad.DTOs
{
    public class ResponseModelDTO
    {
        public bool TestValido { get; set; }
        public string MensajeError { get; set; }

        public string ObservacionGeneralIA { get; set; }
        public List<RecomendacionesDTO> Recomendaciones { get; set; }
    }
}
