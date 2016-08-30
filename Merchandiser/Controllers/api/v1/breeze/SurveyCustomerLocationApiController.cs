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
                SurveyId = x.SurveyId,
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
            try
            {
                item.CreatedBy = User.Identity.GetUserId();
                return repository.Create(item.ToEntity()).ToViewModel();
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Trace.TraceInformation("Property: {0} Error: {1}",
                                                validationError.PropertyName,
                                                validationError.ErrorMessage);
                    }
                }
                return null;
            }
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