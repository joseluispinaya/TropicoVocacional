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
    public class UnitarioAppTests
    {
        [TestMethod]
        public void GetUnidadesEduTest()
        {
            // Arrange
            // Conexión a BD App.config.

            // Actuar
            var respuesta = NUnidadEducativa.GetInstance().ListaUndEducativas();

            // Assert
            Assert.IsTrue(respuesta.Estado, "La operación falló con el mensaje: " + respuesta.Mensaje);

            Assert.IsNotNull(respuesta.Data, "La propiedad Data retornó nula en lugar de una lista.");

            Assert.IsTrue(respuesta.Data.Count > 0, "La consulta fue exitosa, pero no se encontraron datos en la base de datos.");
        }

        [TestMethod]
        public void GetEstUnidadEduByIDTest()
        {
            // Actuar
            var respuesta = NEstudiante.GetInstance().ListarEstIdUndEd(2);

            // Assert
            Assert.IsTrue(respuesta.Estado, "La operación falló con el mensaje: " + respuesta.Mensaje);

            Assert.IsNotNull(respuesta.Data, "La propiedad Data retornó nula en lugar de una lista.");
            Assert.IsTrue(respuesta.Data.Count > 0, "La consulta fue exitosa, pero no se encontraron datos en la base de datos.");
        }

        [TestMethod]
        public void GetLoginEstudianteTest()
        {
            // Actuar
            var respuesta = NEstudiante.GetInstance().LoginEstudiante("carlosmza@yopmail.com");

            // Assert
            Assert.IsTrue(respuesta.Estado, "La operación falló con el mensaje: " + respuesta.Mensaje);

            Assert.IsNotNull(respuesta.Data, "La propiedad Data retornó nula en lugar del objeto.");
        }

        [TestMethod]
        public void GetPreguntasTest()
        {
            // Arrange
            // Conexión a BD App.config.

            // Actuar
            var respuesta = NPregunta.GetInstance().ListarPreguntas(1);

            // Assert
            Assert.IsTrue(respuesta.Estado, "La operación falló con el mensaje: " + respuesta.Mensaje);

            Assert.IsNotNull(respuesta.Data, "La propiedad Data retornó nula en lugar de una lista.");

            Assert.IsTrue(respuesta.Data.Count > 0, "La consulta fue exitosa, pero no se encontraron datos en la base de datos.");
        }

        [TestMethod]
        public void GetPreguntasAleatoriasTest()
        {
            // Arrange
            // Conexión a BD App.config.

            // Actuar
            var respuesta = NPregunta.GetInstance().ObtenerPreguntasAleatorias(6);

            // Assert
            Assert.IsTrue(respuesta.Estado, "La operación falló con el mensaje: " + respuesta.Mensaje);

            Assert.IsNotNull(respuesta.Data, "La propiedad Data retornó nula en lugar de una lista.");

            Assert.IsTrue(respuesta.Data.Count > 0, "La consulta fue exitosa, pero no se encontraron datos en la base de datos.");
        }

        [TestMethod]
        public void GetCarrerasTest()
        {
            // Arrange
            // Conexión a BD App.config.

            // Actuar
            var respuesta = NPregunta.GetInstance().ListaCarreras();

            // Assert
            Assert.IsTrue(respuesta.Estado, "La operación falló con el mensaje: " + respuesta.Mensaje);

            Assert.IsNotNull(respuesta.Data, "La propiedad Data retornó nula en lugar de una lista.");

            Assert.IsTrue(respuesta.Data.Count > 0, "La consulta fue exitosa, pero no se encontraron datos en la base de datos.");
        }
    }
}
