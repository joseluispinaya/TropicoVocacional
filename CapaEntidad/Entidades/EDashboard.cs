using System.Collections.Generic;

namespace CapaEntidad.Entidades
{
    public class EDashboard
    {
        public EKPIs KPIs { get; set; } = new EKPIs();
        public List<ECarreraCantidad> GraficoDona { get; set; } = new List<ECarreraCantidad>();
        public EDistribucion GraficoBarras { get; set; } = new EDistribucion();
        public List<ECarreraPromedio> TopRecomendaciones { get; set; } = new List<ECarreraPromedio>();
    }

    public class EKPIs
    {
        public int TotalTests { get; set; }
        public int EstudiantesEvaluados { get; set; }
        public int CarrerasDestacadas { get; set; }
        public int TotalRecomendaciones { get; set; }
    }

    public class ECarreraCantidad
    {
        public string Carrera { get; set; }
        public int Cantidad { get; set; }
    }

    public class EDistribucion
    {
        public int Alto { get; set; }
        public int Medio { get; set; }
        public int Bajo { get; set; }
    }

    public class ECarreraPromedio
    {
        public string Carrera { get; set; }
        public decimal Promedio { get; set; }
    }
}
