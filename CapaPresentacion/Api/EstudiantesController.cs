using CapaEntidad.DTOs;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CapaPresentacion.Api
{
    // 1. Habilitamos CORS para que la App Móvil no tenga bloqueos
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    // 2. Definimos la ruta base para este controlador
    [RoutePrefix("api/estudiantes")]
    public class EstudiantesController : ApiController
    {
        [HttpPost]
        [Route("registro")]
        public IHttpActionResult RegistrarEst([FromBody] EstudianteDTO request)
        {
            // 1. Validación inicial del objeto
            if (request == null)
            {
                return Ok(new Respuesta<int>
                {
                    Estado = false,
                    Valor = "warning",
                    Mensaje = "Debe enviar los datos requeridos."
                });
            }

            // 2. Validación de campos obligatorios críticos (¡NUEVO!)
            if (string.IsNullOrEmpty(request.ClaveHash) || string.IsNullOrEmpty(request.Correo) || string.IsNullOrEmpty(request.NroCi))
            {
                return Ok(new Respuesta<int>
                {
                    Estado = false,
                    Valor = "warning",
                    Mensaje = "El carnet, correo y contraseña son obligatorios."
                });
            }

            try
            {
                var utilidades = Utilidadesj.GetInstance();
                string imageUrl = string.Empty;

                // 3. Manejo de la foto
                if (!string.IsNullOrEmpty(request.Base64Image))
                {
                    byte[] imageBytes = Convert.FromBase64String(request.Base64Image);
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/ImagenesEst/";
                        imageUrl = utilidades.UploadPhoto(stream, folder);
                    }
                }

                request.Photo = imageUrl;

                // 4. Encriptación segura (ya validamos arriba que no es null)
                request.ClaveHash = utilidades.Hash(request.ClaveHash);

                // 5. Llamada a la capa de negocios
                Respuesta<int> resultadoBD = NEstudiante.GetInstance().RegistroEstAppNew(request);

                // 6. Retornar la respuesta
                return Ok(resultadoBD);
            }
            catch (Exception)
            {
                return Ok(new Respuesta<int>
                {
                    Estado = false,
                    Valor = "error",
                    Mensaje = "Ocurrió un error interno en el servidor"
                });
            }
        }

        [HttpGet]
        [Route("combo")]
        public IHttpActionResult ListaUndEducativas()
        {
            var respuesta = NUnidadEducativa.GetInstance().ListaUndEducativas();
            return Ok(respuesta);
        }

        [HttpGet]
        [Route("preguntas")]
        public IHttpActionResult PreguntasRandon()
        {
            var respuesta = NPregunta.GetInstance().ObtenerPreguntasAleatorias(7);
            return Ok(respuesta);
        }

        [HttpPost]
        [Route("loginApp")]
        public IHttpActionResult LoginEstudiante([FromBody] LoginDTO loginDTO)
        {
            try
            {
                // 1. Validación de objeto nulo
                if (loginDTO == null)
                {
                    return Ok(new Respuesta<EEstudiante>
                    {
                        Estado = false,
                        Mensaje = "Debe enviar los datos para iniciar sesión.",
                        Data = null
                    });
                }

                // 2. Validación temprana de campos vacíos (Ahorra consultas a la BD)
                if (string.IsNullOrEmpty(loginDTO.Correo) || string.IsNullOrEmpty(loginDTO.Clave))
                {
                    return Ok(new Respuesta<EEstudiante>
                    {
                        Estado = false,
                        Mensaje = "El correo y la contraseña son obligatorios.",
                        Data = null
                    });
                }

                // 3. Llamada a la capa de datos
                var resp = NEstudiante.GetInstance().LoginEstudiante(loginDTO.Correo);

                // 4. Verificar si ocurrió un error grave en la BD (Manejado por el catch de la capa de datos)
                if (!resp.Estado && resp.Mensaje == "Error servidor")
                {
                    return Ok(new Respuesta<EEstudiante>
                    {
                        Estado = false,
                        Mensaje = "Ocurrió un error en el servidor. Intente más tarde.",
                        Data = null
                    });
                }

                // 5. Verificar si el usuario existe en BD
                if (!resp.Estado || resp.Data == null)
                {
                    return Ok(new Respuesta<EEstudiante>
                    {
                        Estado = false,
                        Mensaje = "Usuario o Contraseña incorrectos.",
                        Data = null
                    });
                }

                var objEst = resp.Data;

                // 6. Verificamos si está activo ANTES de gastar recursos desencriptando la clave
                if (!objEst.Estado)
                {
                    return Ok(new Respuesta<EEstudiante>
                    {
                        Estado = false,
                        Mensaje = "Su cuenta esta inactiva. Contáctese con el Dep. de Sistemas.",
                        Data = null
                    });
                }

                // 7. Verificamos la contraseña (BCrypt)
                bool passCorrecta = Utilidadesj.GetInstance().Verify(loginDTO.Clave, objEst.ClaveHash);

                if (!passCorrecta)
                {
                    return Ok(new Respuesta<EEstudiante>
                    {
                        Estado = false,
                        Mensaje = "Usuario o Contraseña incorrectos.",
                        Data = null
                    });
                }

                // 8. Limpiamos datos sensibles antes de enviar al frontend (Excelente práctica)
                objEst.ClaveHash = "";

                return Ok(new Respuesta<EEstudiante>
                {
                    Estado = true,
                    Mensaje = "Bienvenido al sistema",
                    Data = objEst
                });
            }
            catch (Exception)
            {
                return Ok(new Respuesta<EEstudiante>
                {
                    Estado = false,
                    Mensaje = "Error interno en el servidor al intentar iniciar sesión.",
                    Data = null
                });
            }
        }

        //public string Get(int id)
        //{
        //    return "value";
        //}

        //public void Post([FromBody] string value)
        //{
        //}

        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //public void Delete(int id)
        //{
        //}
    }
}