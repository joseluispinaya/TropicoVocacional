using CapaEntidad.DTOs;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CapaPresentacion.Api
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    // 2. Definimos la ruta base para este controlador
    [RoutePrefix("api/preguntas")]
    public class PreguntasController : ApiController
    {
        [HttpGet]
        [Route("preguntasTest")]
        public IHttpActionResult PreguntasRandon()
        {
            var respuesta = NPregunta.GetInstance().ObtenerPreguntasAleatorias(7);
            return Ok(respuesta);
        }

        [HttpPost]
        [Route("procesar")]
        public IHttpActionResult ProcesarTest([FromBody] SolicitudTestDTO request)
        {
            // 1. VALIDACIÓN INICIAL
            if (request == null || request.IdEstudiante <= 0 || request.Respuestas == null || request.Respuestas.Count == 0)
            {
                return Ok(new Respuesta<ResultadoIADTO>
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Datos incompletos. Asegúrese de enviar el estudiante y sus respuestas."
                });
            }

            try
            {
                // Convertimos la lista de respuestas de C# a un string JSON para tu Procedimiento Almacenado
                string respuestasJsonString = JsonConvert.SerializeObject(request.Respuestas);
                // PASO 1: REGISTRAR TEST Y RESPUESTAS 
                var resRegistro = NRespuesta.GetInstance().RegistrarTest(request.IdEstudiante, respuestasJsonString);

                if (!resRegistro.Estado || resRegistro.Data == 0)
                {
                    // Si falló, devolvemos el error a la app
                    return Ok(new Respuesta<ResultadoIADTO>
                    {
                        Estado = false,
                        Data = null,
                        Mensaje = resRegistro.Mensaje
                    });
                }

                int idTestGenerado = resRegistro.Data; // Ya tenemos el ID del Test!

                // PASO 2: OBTENER DATOS PARA LA IA preguntas/respuestas
                var datosParaIA = NRespuesta.GetInstance().ObtenerTestResp(idTestGenerado);

                if (!datosParaIA.Estado)
                {
                    return Ok(new Respuesta<ResultadoIADTO>
                    {
                        Estado = false,
                        Data = null,
                        Mensaje = datosParaIA.Mensaje
                    });
                }

                // PASO 3: ENVIAR A LA IA (Usando tu clase HelpersIA)
                //var datosParaModelo = datosParaIA.Data;
                var utilidades = HelpersIA.GetInstance();
                var resultadoIA = utilidades.AnalizarTestConIA(datosParaIA.Data);

                if (!resultadoIA.Estado)
                {
                    return Ok(resultadoIA);
                }

                // ==============================================================================
                // SOLUCIÓN AL PASO 4: Convertir la lista de recomendaciones en un String JSON
                // ==============================================================================

                // 1. Extraemos el objeto completo que nos devolvió la IA
                ResultadoIADTO datosFinalesIA = resultadoIA.Data;

                // 2. Serializamos SOLO la lista de Recomendaciones a un string JSON para que SQL Server pueda leerlo con OPENJSON
                string recomendacionesJsonParaSQL = JsonConvert.SerializeObject(datosFinalesIA.Recomendaciones);

                // PASO 4: GUARDAR LOS RESULTADOS DE LA IA EN LA BASE DE DATOS
                // 3. Ahora sí llamamos a tu método de la capa de datos
                var resGuardarIA = NRespuesta.GetInstance().RegistrarResultIa(
                    idTestGenerado,
                    datosFinalesIA.ObservacionGeneralIA, // Mandamos la observación (String)
                    recomendacionesJsonParaSQL           // Mandamos la lista serializada (String JSON)
                );

                if (!resGuardarIA.Estado || resGuardarIA.Data == 0)
                {
                    return Ok(new Respuesta<ResultadoIADTO>
                    {
                        Estado = false,
                        Data = null,
                        Mensaje = resGuardarIA.Mensaje
                    });
                }

                return Ok(new Respuesta<ResultadoIADTO>
                {
                    Estado = true,
                    Data = datosFinalesIA,
                    Mensaje = "Test procesado y analizado con éxito."
                });

            }
            catch (Exception ex)
            {
                return Ok(new Respuesta<ResultadoIADTO>
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Ocurrió un error en el servidor: " + ex.Message
                });
            }

        }

    }
}