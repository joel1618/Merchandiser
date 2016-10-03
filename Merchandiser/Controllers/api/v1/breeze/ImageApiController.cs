using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Net.Http;
using System.Net;
using System.Net.Http.Formatting;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Net.Http.Headers;
using System.Text;

namespace Merchandiser.Controllers.api.v1.breeze
{
    public class ImageApiController : ApiController
    {
        [Route("api/v1/imageapi/GetBeforeImage/{id}")]
        [HttpGet]
        public HttpResponseMessage GetBeforeImage(Guid id)
        {
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            try
            {
                // Photo.Resize is a static method to resize the image
                //Image image = Photo.Resize(Image.FromFile("C:\\Merchandiser\\BeforeImages\\" + id.ToString() + ".jpg"), 200, 200);
                using (Image image = Image.FromFile(GetBeforeImagePath(id) + id.ToString() + ".jpg"))
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    image.Save(memoryStream, ImageFormat.Jpeg);

                    httpResponseMessage.Content = new ByteArrayContent(memoryStream.ToArray());

                    httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
                    httpResponseMessage.StatusCode = HttpStatusCode.OK;
                }
            }
            catch (Exception)
            {
                httpResponseMessage.StatusCode = HttpStatusCode.NotFound;
            }
            return httpResponseMessage;
        }

        [Route("api/v1/imageapi/GetAfterImage/{id}")]
        [HttpGet]
        public HttpResponseMessage GetAfterImage(Guid id)
        {
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            try
            {
                // Photo.Resize is a static method to resize the image
                //Image image = Photo.Resize(Image.FromFile("C:\\Merchandiser\\BeforeImages\\" + id.ToString() + ".jpg"), 200, 200);
                using (Image image = Image.FromFile(GetAfterImagePath(id) + id.ToString() + ".jpg"))
                using(MemoryStream memoryStream = new MemoryStream())
                {
                    image.Save(memoryStream, ImageFormat.Jpeg);

                    httpResponseMessage.Content = new ByteArrayContent(memoryStream.ToArray());

                    httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
                    httpResponseMessage.StatusCode = HttpStatusCode.OK;
                }
            }
            catch (Exception)
            {
                httpResponseMessage.StatusCode = HttpStatusCode.NotFound;
            }
            return httpResponseMessage;
        }

        [Route("api/v1/imageapi/CreateBeforeImage/{id}")]
        [HttpPost]
        public IHttpActionResult CreateBeforeImage(Guid id)
        {
            var files = HttpContext.Current.Request.InputStream;
            Directory.CreateDirectory(GetBeforeImagePath(id));
            var fileStream = File.Create(GetBeforeImagePath(id) + id.ToString() + ".jpg");
            files.CopyTo(fileStream);
            fileStream.Close();
            return Ok();
        }

        [Route("api/v1/imageapi/CreateAfterImage/{id}")]
        [HttpPost]
        public IHttpActionResult CreateAfterImage(Guid id)
        {
            var files = HttpContext.Current.Request.InputStream;
            Directory.CreateDirectory(GetAfterImagePath(id));
            var fileStream = File.Create(GetAfterImagePath(id) + id.ToString() + ".jpg");
            files.CopyTo(fileStream);
            fileStream.Close();
            return Ok();
        }

        [Route("api/v1/imageapi/DeleteBeforeImage/{id}")]
        [HttpDelete]
        public IHttpActionResult DeleteBeforeImage(Guid id)
        {
            File.Delete(GetBeforeImagePath(id) + id.ToString() + ".jpg");
            return Ok();
        }

        [Route("api/v1/imageapi/DeleteAfterImage/{id}")]
        [HttpDelete]
        public IHttpActionResult DeleteAfterImage(Guid id)
        {
            File.Delete(GetAfterImagePath(id) + id.ToString() + ".jpg");
            return Ok();
        }

        private string GetBeforeImagePath(Guid id)
        {
            var guid = id.ToByteArray();
            StringBuilder builder = new StringBuilder();
            builder.Append(AppDomain.CurrentDomain.BaseDirectory);
            builder.Append("\\SurveyImages\\BeforeImages\\");
            for (int i = 0; i < 8; i++)
            {
                builder.Append(guid[i]);
                builder.Append("/");
            }
            return builder.ToString();
        }

        public string GetAfterImagePath(Guid id)
        {
            var guid = id.ToByteArray();
            StringBuilder builder = new StringBuilder();
            builder.Append(AppDomain.CurrentDomain.BaseDirectory);
            builder.Append("\\SurveyImages\\AfterImages\\");
            for (int i = 0; i < 8; i++)
            {
                builder.Append(guid[i]);
                builder.Append("\\");
            }
            return builder.ToString();
        }
    }
}