using Breeze.WebApi2;
using Merchandiser.Models;
using Merchandiser.Models.Extensions;
using Merchandiser.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1.breeze
{
    [BreezeController]
    public class SurveyHeaderApiController : ApiController
    {
        SurveyHeaderRepository repository;
        public SurveyHeaderApiController()
        {
            this.repository = new SurveyHeaderRepository();
        }

        [HttpGet]
        public IQueryable<SurveyHeaderViewModel> Search()
        {
            var currentUserId = User.Identity.GetUserId();
            return repository.Search().Where(e => e.CreatedBy == currentUserId).Select(x => new SurveyHeaderViewModel()
            {
                Id = x.Id,
                Created = x.Created
            });
        }

        [HttpGet]
        public SurveyHeaderViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public SurveyHeaderViewModel Create(SurveyHeaderViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            return repository.Create(item.ToEntity()).ToViewModel();
        }

        [HttpPut]
        public SurveyHeaderViewModel Update(Guid id, SurveyHeaderViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            return repository.Update(id, item.ToEntity()).ToViewModel();
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            repository.Delete(id);
        }

        [HttpPost]
        public void CreateBeforeImage()
        {
            var file = HttpContext.Current.Request.Files[0];
            var fileName = file.FileName;
            var fileStream = File.Create("c:\\image.jpg");
            file.InputStream.CopyTo(fileStream);
            fileStream.Close();
        }

        [HttpPost]
        public void CreateAfterImage()
        {

        }
    }
}