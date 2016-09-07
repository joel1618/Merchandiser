using Breeze.WebApi2;
using Merchandiser.Models;
using Merchandiser.Models.Extensions;
using Merchandiser.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity.Validation;
using System.Diagnostics;
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
                CompanyId = x.CompanyId,
                SurveyId = x.SurveyId,
                LocationId = x.LocationId,
                CustomerId = x.CustomerId,
                Customer = new CustomerViewModel()
                {
                    Id = x.Customer.Id,
                    Name = x.Customer.Name
                },
                Location = new LocationViewModel()
                {
                    Id = x.Location.Id,
                    Name = x.Location.Name
                },
                Survey = new SurveyViewModel()
                {
                    Id = x.Survey.Id,
                    Name = x.Survey.Name
                },
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
            var entity = item.ToEntity();
            return repository.Create(entity).ToViewModel();
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