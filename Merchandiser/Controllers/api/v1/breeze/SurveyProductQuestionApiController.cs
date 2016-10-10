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
    public class SurveyProductQuestionApiController : ApiController
    {
        SurveyProductQuestionRepository repository;
        public SurveyProductQuestionApiController()
        {
            this.repository = new SurveyProductQuestionRepository();
        }

        [HttpGet]
        public IQueryable<SurveyProductQuestionViewModel> Search()
        {
            var response = repository.Search().Select(x => new SurveyProductQuestionViewModel()
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                SurveyId = x.SurveyId,
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
                Created = x.Created
            });
            return response;
        }

        [HttpGet]
        public SurveyProductQuestionViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public IHttpActionResult Create(SurveyProductQuestionViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            var record = repository.Search().Where(e => e.CompanyId == item.CompanyId && e.ProductId == item.ProductId && e.QuestionId == item.QuestionId && e.SurveyId == item.SurveyId).FirstOrDefault();
            if (record != null)
            {
                return BadRequest("This record already exists.");
            }
            var response = repository.Create(item.ToEntity()).ToViewModel();
            return Ok(response);
        }

        [HttpPut]
        public IHttpActionResult Update(Guid id, SurveyProductQuestionViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            var record = repository.Search().Where(e => e.CompanyId == item.CompanyId && e.ProductId == item.ProductId 
            && e.QuestionId == item.QuestionId && e.SurveyId == item.SurveyId && e.Id != item.Id).FirstOrDefault();
            if (record != null)
            {
                return BadRequest("This record already exists.");
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