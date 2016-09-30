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

namespace Merchandiser.Controllers.api.v1.breeze
{
    public class ImageApiController : ApiController
    {
        private string BeforeImagesPath = AppDomain.CurrentDomain.BaseDirectory + "\\SurveyImages\\BeforeImages\\";
        private string AfterImagesPath = AppDomain.CurrentDomain.BaseDirectory + "\\SurveyImages\\AfterImages\\";

        [Route("api/v1/imageapi/GetBeforeImage/{id}")]
        [HttpGet]
        public HttpResponseMessage GetBeforeImage(Guid id)
        {
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            try
            {
                // Photo.Resize is a static method to resize the image
                //Image image = Photo.Resize(Image.FromFile("C:\\Merchandiser\\BeforeImages\\" + id.ToString() + ".jpg"), 200, 200);
                using (Image image = Image.FromFile(BeforeImagesPath + id.ToString() + ".jpg"))
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
                using (Image image = Image.FromFile(AfterImagesPath + id.ToString() + ".jpg"))
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
            var fileStream = File.Create(BeforeImagesPath + id.ToString() + ".jpg");
            files.CopyTo(fileStream);
            fileStream.Close();
            return Ok();
        }

        [Route("api/v1/imageapi/CreateAfterImage/{id}")]
        [HttpPost]
        public IHttpActionResult CreateAfterImage(Guid id)
        {
            var files = HttpContext.Current.Request.InputStream;
            var fileStream = File.Create(AfterImagesPath + id.ToString() + ".jpg");
            files.CopyTo(fileStream);
            fileStream.Close();
            return Ok();
        }

        [Route("api/v1/imageapi/DeleteBeforeImage/{id}")]
        [HttpDelete]
        public IHttpActionResult DeleteBeforeImage(Guid id)
        {
            File.Delete(BeforeImagesPath + id.ToString() + ".jpg");
            return Ok();
        }

        [Route("api/v1/imageapi/DeleteAfterImage/{id}")]
        [HttpDelete]
        public IHttpActionResult DeleteAfterImage(Guid id)
        {
            File.Delete(AfterImagesPath + id.ToString() + ".jpg");
            return Ok();
        }
    }
}