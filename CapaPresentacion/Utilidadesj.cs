using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace CapaPresentacion
{
    public class Utilidadesj
    {
        #region "PATRON SINGLETON"
        private static Utilidadesj _instancia = null;

        private Utilidadesj()
        {

        }

        public static Utilidadesj GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new Utilidadesj();
            }
            return _instancia;
        }
        #endregion

        public string UploadPhoto(MemoryStream stream, string folder)
        {
            string rutaa = "";

            try
            {
                stream.Position = 0;

                var guid = Guid.NewGuid().ToString();
                var file = $"{guid}.jpg";

                var fullPath = $"{folder}{file}";
                var path = Path.Combine(HttpContext.Current.Server.MapPath(folder), file);

                // Guardar la imagen en el sistema de archivos
                File.WriteAllBytes(path, stream.ToArray());

                // Verificar si el archivo fue guardado correctamente
                if (File.Exists(path))
                {
                    rutaa = fullPath;
                }
            }
            catch (IOException)
            {
                rutaa = "";
            }
            catch (Exception)
            {
                rutaa = "";
            }
            return rutaa;
        }

        public string Hash(string password)
        {
            // Validamos que no nos envíen contraseñas vacías
            if (string.IsNullOrEmpty(password))
                return string.Empty;

            // Encripta la contraseña. BCrypt genera y aplica el "Salt" automáticamente
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool Verify(string password, string hash)
        {
            // Validamos que ninguno de los dos sea nulo o vacío
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(hash))
                return false;

            // Verifica si la contraseña en texto plano coincide con el hash de la BD
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }

        public bool NotificarAcceso(string toEmailUser, string subject, string estudiante, string textoAccion)
        {
            try
            {
                var from = "xxxxxx@gmail.com"; // Tu correo
                var name = "Sistema Vocacional";
                var smtps = "smtp.gmail.com";
                var port = 587;
                var password = "xxxxxxx"; // Tu contraseña de aplicación

                var correo = new MailMessage
                {
                    From = new MailAddress(from, name)
                };
                correo.To.Add(toEmailUser);
                correo.Subject = subject;

                // Configuración visual y de mensaje basada en la acción
                string colorEstado = textoAccion == "APROBADO" ? "#1B5E20" : "#B71C1C";
                string mensajeDetalle = textoAccion == "APROBADO"
                    ? "Ya puedes iniciar sesión en la aplicación móvil con tus credenciales para realizar tu test de orientación vocacional."
                    : "Tu acceso a la aplicación ha sido suspendido. Por favor, comunícate con la dirección para más detalles.";

                // Plantilla HTML Responsive con estilos integrados
                string cuerpo = $@"
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='utf-8'>
                </head>
                <body style='font-family: Helvetica, Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333333; margin: 0;'>
                    <div style='max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);'>
                        
                        <div style='background-color: #442484; padding: 20px; text-align: center;'>
                            <h2 style='color: #ffffff; margin: 0; letter-spacing: 1px;'>Sistema Vocacional</h2>
                        </div>
                        
                        <div style='padding: 30px;'>
                            <p style='font-size: 16px;'>Hola <strong>{estudiante}</strong>,</p>
                            <p style='font-size: 16px;'>Te informamos que el estado de tu cuenta ha sido actualizado.</p>
                            
                            <div style='text-align: center; margin: 35px 0;'>
                                <span style='background-color: {colorEstado}; color: #ffffff; padding: 12px 25px; border-radius: 25px; font-size: 18px; font-weight: bold; letter-spacing: 1px;'>
                                    ACCESO {textoAccion}
                                </span>
                            </div>
                            
                            <p style='font-size: 15px; line-height: 1.6; color: #555555; text-align: justify;'>
                                {mensajeDetalle}
                            </p>
                        </div>
                        
                        <div style='background-color: #f9f9f9; padding: 15px; text-align: center; border-top: 1px solid #eeeeee;'>
                            <p style='font-size: 12px; color: #999999; margin: 0;'>Este es un mensaje automático, por favor no respondas a este correo.</p>
                        </div>
                        
                    </div>
                </body>
                </html>";

                correo.Body = cuerpo;
                correo.IsBodyHtml = true;
                correo.Priority = MailPriority.Normal;

                SmtpClient smtp = new SmtpClient
                {
                    Host = smtps,
                    Port = port,
                    Credentials = new NetworkCredential(from, password),
                    EnableSsl = true
                };

                smtp.Send(correo);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool EnviosCorreos(string toEmailUser, string subjec, string nombreUser, string confirmUrl)
        {
            try
            {
                var from = "xxxxx@gmail.com";
                var name = "Sistema Vocacional";
                var smtps = "smtp.gmail.com";
                var port = 587;
                var password = "xxxxxxx";

                var correo = new MailMessage
                {
                    From = new MailAddress(from, name)
                };
                correo.To.Add(toEmailUser);
                correo.Subject = subjec;

                // Plantilla HTML profesional usando tablas y estilos en línea para compatibilidad total
                string cuerpo = $@"
                    <!DOCTYPE html>
                    <html lang='es'>
                    <head>
                        <meta charset='UTF-8'>
                        <title>Recuperar Contraseña</title>
                    </head>
                    <body style='margin: 0; padding: 0; background-color: #f4f7f6; font-family: Helvetica, Arial, sans-serif; color: #333333;'>
                        <table width='100%' border='0' cellspacing='0' cellpadding='0' style='background-color: #f4f7f6; padding: 40px 0;'>
                            <tr>
                                <td align='center'>
                                    <table width='600' border='0' cellspacing='0' cellpadding='0' style='background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);'>
                            
                                        <!-- Cabecera -->
                                        <tr>
                                            <td align='center' style='background-color: #3292e0; padding: 30px 20px;'>
                                                <h1 style='color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;'>Sistema Vocacional IA</h1>
                                            </td>
                                        </tr>
                            
                                        <!-- Cuerpo del Correo -->
                                        <tr>
                                            <td style='padding: 40px 30px;'>
                                                <p style='margin-top: 0; font-size: 16px;'>Hola <strong>{nombreUser}</strong>,</p>
                                                <p style='font-size: 15px; line-height: 1.6; color: #555555;'>
                                                    Hemos recibido una solicitud para restablecer la contraseña de tu cuenta como Director. 
                                                    Para crear una nueva contraseña y recuperar tu acceso, por favor haz clic en el siguiente botón:
                                                </p>
                                    
                                                <!-- Botón de Acción -->
                                                <table width='100%' border='0' cellspacing='0' cellpadding='0' style='margin: 30px 0;'>
                                                    <tr>
                                                        <td align='center'>
                                                            <a href='{confirmUrl}' style='background-color: #3292e0; color: #ffffff; text-decoration: none; padding: 14px 35px; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block;'>Restablecer mi Contraseña</a>
                                                        </td>
                                                    </tr>
                                                </table>
                                    
                                                <!-- Enlace de respaldo -->
                                                <p style='font-size: 14px; line-height: 1.5; color: #777777; margin-bottom: 0;'>
                                                    Si el botón no funciona, copia y pega el siguiente enlace en tu navegador web:<br>
                                                    <a href='{confirmUrl}' style='color: #3292e0; word-break: break-all;'>{confirmUrl}</a>
                                                </p>
                                    
                                                <p style='font-size: 14px; line-height: 1.5; color: #999999; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px;'>
                                                    Si no realizaste esta solicitud, puedes ignorar este correo de forma segura. Tu contraseña actual seguirá siendo válida.
                                                </p>
                                            </td>
                                        </tr>
                            
                                        <!-- Pie de página -->
                                        <tr>
                                            <td align='center' style='background-color: #f8f9fa; padding: 20px;'>
                                                <p style='margin: 0; font-size: 12px; color: #aaaaaa;'>
                                                    &copy; {DateTime.Now.Year} Sistema de Orientación Vocacional. Todos los derechos reservados.
                                                </p>
                                            </td>
                                        </tr>
                            
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>";

                correo.Body = cuerpo;
                correo.IsBodyHtml = true;
                correo.Priority = MailPriority.Normal;

                SmtpClient smtp = new SmtpClient
                {
                    Host = smtps,
                    Port = port,
                    Credentials = new NetworkCredential(from, password),
                    EnableSsl = true
                };

                smtp.Send(correo);
                return true;
            }
            catch (SmtpException)
            {
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}