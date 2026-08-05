using CapaNegocio;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaPruebas
{
    [TestClass]
    public class UnitariosTests
    {
        [TestMethod]
        public void GetDirectoresTest()
        {
            // Arrange
            // Conexión a BD App.config.

            // Actuar
            var respuesta = NDirector.GetInstance().ListaDirectores(0);

            // Assert
            Assert.IsTrue(respuesta.Estado, "La operación falló con el mensaje: " + respuesta.Mensaje);

            Assert.IsNotNull(respuesta.Data, "La propiedad Data retornó nula en lugar de una lista.");

            Assert.IsTrue(respuesta.Data.Count > 0, "La consulta fue exitosa, pero no se encontraron datos en la base de datos.");
        }

        [TestMethod]
        public void GetDirectorByIDTest()
        {
            // Actuar
            var respuesta = NDirector.GetInstance().ObtenerDirectorPorId(1);

            // Assert
            Assert.IsTrue(respuesta.Estado, "La operación falló con el mensaje: " + respuesta.Mensaje);

            Assert.IsNotNull(respuesta.Data, "La propiedad Data retornó nula en lugar del objeto.");
        }

        [TestMethod]
        public void GetLoginDirectorTest()
        {
            // Actuar
            var respuesta = NDirector.GetInstance().LoginDirectores("miguelinpp@yopmail.com");

            // Assert
            Assert.IsTrue(respuesta.Estado, "La operación falló con el mensaje: " + respuesta.Mensaje);

            Assert.IsNotNull(respuesta.Data, "La propiedad Data retornó nula en lugar del objeto.");
        }

        [TestMethod]
        public void GetCuestionariosTest()
        {
            // Arrange
            // Conexión a BD App.config.

            // Actuar
            var respuesta = NCuestionario.GetInstance().ListaCuestionarios();

            // Assert
            Assert.IsTrue(respuesta.Estado, "La operación falló con el mensaje: " + respuesta.Mensaje);

            Assert.IsNotNull(respuesta.Data, "La propiedad Data retornó nula en lugar de una lista.");

            Assert.IsTrue(respuesta.Data.Count > 0, "La consulta fue exitosa, pero no se encontraron datos en la base de datos.");
        }


    }
}
