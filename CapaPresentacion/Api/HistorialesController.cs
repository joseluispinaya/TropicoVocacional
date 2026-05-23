using CapaEntidad.DTOs;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
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
    [RoutePrefix("api/historiales")]
    public class HistorialesController : ApiController
    {
        [HttpGet]
        [Route("historial/{id:int}")]
        public IHttpActionResult HistorialTest(int id)
        {
            var respuesta = NRespuesta.GetInstance().HistorialTestEst(id);
            return Ok(respuesta);
        }

        [HttpGet]
        [Route("detalleHist/{id:int}")]
        public IHttpActionResult DetalleHistorial(int id)
        {
            var respuesta = NRespuesta.GetInstance().DetalleHistorialTest(id);
            return Ok(respuesta);
        }
    }
}