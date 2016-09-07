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
            var currentUserId = User.Identity.GetUserId();
            return repository.Search().Where(e => e.CreatedBy == currentUserId).Select(x => new SurveyProductQuestionViewModel()
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                SurveyId = x.SurveyId,
                Product = new ProductViewModel()
                {
                    Id = x.Product.Id,
                    Name = x.Product.Name
                },
                Question = new QuestionViewModel()
                {
                    Id = x.Question.Id,
                    Name = x.Question.Name
                },
                Created = x.Created
            });
        }

        [HttpGet]
        public SurveyProductQuestionViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public SurveyProductQuestionViewModel Create(SurveyProductQuestionViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            return repository.Create(item.ToEntity()).ToViewModel();
        }

        [HttpPut]
        public SurveyProductQuestionViewModel Update(Guid id, SurveyProductQuestionViewModel item)
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