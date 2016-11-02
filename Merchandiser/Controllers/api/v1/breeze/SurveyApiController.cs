using Breeze.WebApi2;
using Merchandiser.ControllerHelpers;
using Merchandiser.Models;
using Merchandiser.Models.Extensions;
using Merchandiser.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1.breeze
{
    [BreezeController]
    public class SurveyApiController : ApiController
    {
        SurveyRepository repository;
        UserRoleRepository userRoleRepository;
        public SurveyApiController()
        {
            this.repository = new SurveyRepository();
            this.userRoleRepository = new UserRoleRepository();
        }

        [HttpGet]
        public IQueryable<SurveyViewModel> Search(Guid companyId)
        {
            var userId = User.Identity.GetUserId();
            var response = repository.Search().FilterAllByUserAndCompany(userId, companyId, null, "CompanyId", null, userRoleRepository).Select(x => new SurveyViewModel()
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                Name = x.Name,
                Created = x.Created,
                IsEdit = x.IsEdit,
                IsEditDays = x.IsEditDays.HasValue ? x.IsEditDays.Value : new Nullable<int>(),
                IsDelete = x.IsDelete,
                IsDeleteDays = x.IsDeleteDays.HasValue ? x.IsDeleteDays.Value : new Nullable<int>()
            });
            return response;
        }

        [HttpGet]
        public SurveyViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public IHttpActionResult Create(SurveyViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            var record = repository.Search().Where(e => e.CompanyId == item.CompanyId && e.Name == item.Name).FirstOrDefault();
            if (record != null)
            {
                return Content(System.Net.HttpStatusCode.BadRequest, "This record already exists.");
            }
            var response = repository.Create(item.ToEntity()).ToViewModel();
            return Ok(response);
        }

        [HttpPut]
        public IHttpActionResult Update(Guid id, SurveyViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            var record = repository.Search().Where(e => e.CompanyId == item.CompanyId && e.Name == item.Name && e.Id != item.Id).FirstOrDefault();
            if (record != null)
            {
                return Content(System.Net.HttpStatusCode.BadRequest, "This record already exists.");
            }
            var response = repository.Update(id, item.ToEntity()).ToViewModel();
            return Ok(response);
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            repository.Delete(id);
        }
    }
}