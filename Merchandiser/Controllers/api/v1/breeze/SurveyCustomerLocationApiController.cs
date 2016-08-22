using Breeze.WebApi2;
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
    public class SurveyCustomerLocationApiController : ApiController
    {
        SurveyCustomerLocationRepository repository;
        public SurveyCustomerLocationApiController()
        {
            this.repository = new SurveyCustomerLocationRepository();
        }

        [HttpGet]
        public IQueryable<SurveyCustomerLocationViewModel> Search()
        {
            var currentUserId = User.Identity.GetUserId();
            return repository.Search().Where(e => e.CreatedBy == currentUserId).Select(x => new SurveyCustomerLocationViewModel()
            {
                Id = x.Id,
                Created = x.Created
            });
        }

        [HttpGet]
        public SurveyCustomerLocationViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public SurveyCustomerLocationViewModel Create(SurveyCustomerLocationViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            return repository.Create(item.ToEntity()).ToViewModel();
        }

        [HttpPut]
        public SurveyCustomerLocationViewModel Update(Guid id, SurveyCustomerLocationViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            return repository.Update(id, item.ToEntity()).ToViewModel();
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            repository.Delete(id);
        }
    }
}