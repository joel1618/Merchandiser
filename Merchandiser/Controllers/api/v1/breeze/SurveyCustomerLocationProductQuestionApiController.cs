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
    public class SurveyCustomerLocationProductQuestionApiController : ApiController
    {
        SurveyCustomerLocationProductQuestionRepository repository;
        CustomerRepository customerRepository;
        LocationRepository locationRepository;
        ProductRepository productRepository;
        QuestionRepository questionRepository;
        public SurveyCustomerLocationProductQuestionApiController()
        {
            this.repository = new SurveyCustomerLocationProductQuestionRepository();
            this.customerRepository = new CustomerRepository();
            this.locationRepository = new LocationRepository();
            this.productRepository = new ProductRepository();
            this.questionRepository = new QuestionRepository();
        }

        [HttpGet]
        public IQueryable<SurveyCustomerLocationProductQuestionViewModel> Search()
        {
            var response = repository.Search().Select(x => new SurveyCustomerLocationProductQuestionViewModel()
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                SurveyId = x.SurveyId,
                LocationId = x.LocationId,
                CustomerId = x.CustomerId,
                ProductId = x.ProductId,
                QuestionId = x.QuestionId,
                RowOrder = x.RowOrder,
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
                Product = new ProductViewModel()
                {
                    Id = x.Product.Id,
                    Name = x.Product.Name,
                    ProductCategory = x.Product.ProductCategory != null ? new ProductCategoryViewModel()
                    {
                        Id = x.Product.ProductCategory.Id,
                        Name = x.Product.ProductCategory.Name
                    } : null
                },
                Question = new QuestionViewModel()
                {
                    Id = x.Question.Id,
                    Name = x.Question.Name,
                    IsRequired = x.Question.IsRequired,
                    IsTrueFalse = x.Question.IsTrueFalse
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
        public SurveyCustomerLocationProductQuestionViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public IHttpActionResult Create(SurveyCustomerLocationProductQuestionViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            var record = repository.Search().Where(e => 
            e.CompanyId == item.CompanyId && 
            e.LocationId == item.LocationId && 
            e.CustomerId == item.CustomerId && 
            e.ProductId == item.ProductId &&
            e.QuestionId == item.QuestionId &&
            e.SurveyId == item.SurveyId).FirstOrDefault();
            if (record != null)
            {
                return Content(System.Net.HttpStatusCode.BadRequest, "This record already exists.");
            }
            var response = repository.Create(item.ToEntity()).ToViewModel();
            //TODO: context.ObjectContext.ContextOptions.LazyLoadingEnabled = lazyLoadingEnabled;
            response.Customer = customerRepository.Get(response.CustomerId).ToViewModel();
            response.Location = locationRepository.Get(response.LocationId).ToViewModel();
            response.Product = productRepository.Get(response.ProductId).ToViewModel();
            response.Question = questionRepository.Get(response.QuestionId).ToViewModel();
            return Ok(response);
        }

        [HttpPut]
        public IHttpActionResult Update(Guid id, SurveyCustomerLocationProductQuestionViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            var record = repository.Search().Where(e =>
            e.CompanyId == item.CompanyId &&
            e.LocationId == item.LocationId &&
            e.CustomerId == item.CustomerId &&
            e.ProductId == item.ProductId &&
            e.QuestionId == item.QuestionId &&
            e.SurveyId == item.SurveyId && 
            e.Id != item.Id).FirstOrDefault();
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