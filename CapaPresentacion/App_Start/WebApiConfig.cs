using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CapaPresentacion.App_Start
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // 2. Configuración de CORS (Permite peticiones desde la App de React Native)
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            // 3. Rutas por atributos (Obligatorio para que funcione tu [Route("registro")])
            config.MapHttpAttributeRoutes();

            // 4. Rutas por convención (Fallback)
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // 5. PRO-TIP: Forzar a que la API siempre responda en JSON y nunca en XML
            //config.Formatters.Remove(config.Formatters.XmlFormatter);
        }
    }
}