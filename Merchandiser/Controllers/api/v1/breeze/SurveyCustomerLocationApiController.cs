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
            var response = repository.Search().Select(x => new SurveyCustomerLocationViewModel()
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
                    Name = x.Location.Name,
                    Address = x.Location.Address,
                    Latitude = x.Location.Latitude.HasValue ? x.Location.Latitude.Value : new Nullable<decimal>(),
                    Longitude = x.Location.Longitude.HasValue ? x.Location.Longitude.Value : new Nullable<decimal>()
                },
                Survey = new SurveyViewModel()
                {
                    Id = x.Survey.Id,
                    Name = x.Survey.Name
                },
                Created = x.Created
            });
            return response;
        }

        [HttpGet]
        public SurveyCustomerLocationViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public IHttpActionResult Create(SurveyCustomerLocationViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            var record = repository.Search().Where(e => e.CompanyId == item.CompanyId && e.LocationId == item.LocationId && e.CustomerId == item.CustomerId && e.SurveyId == item.SurveyId).FirstOrDefault();
            if (record != null)
            {
                return Content(System.Net.HttpStatusCode.BadRequest, "This record already exists.");
            }
            var response = repository.Create(item.ToEntity()).ToViewModel();
            return Ok(response);
        }

        [HttpPut]
        public IHttpActionResult Update(Guid id, SurveyCustomerLocationViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            var record = repository.Search().Where(e => e.CompanyId == item.CompanyId && e.LocationId == item.LocationId 
            && e.CustomerId == item.CustomerId && e.SurveyId == item.SurveyId && e.Id != item.Id).FirstOrDefault();
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