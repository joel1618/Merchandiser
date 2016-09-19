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
    public class SurveyDetailApiController : ApiController
    {
        MerchandiserEntities context;
        SurveyDetailRepository repository;
        public SurveyDetailApiController()
        {
            this.context = new MerchandiserEntities();
            this.repository = new SurveyDetailRepository(context);
        }

        [HttpGet]
        public IQueryable<SurveyDetailViewModel> Search()
        {
            var currentUserId = User.Identity.GetUserId();
            return repository.Search().Where(e => e.CreatedBy == currentUserId).Select(x => new SurveyDetailViewModel()
            {
                Id = x.Id,
                Created = x.Created,
                SurveyHeaderId = x.SurveyHeaderId,
                Product = new ProductViewModel()
                {
                    Id = x.Product.Id,
                    Name = x.Product.Name
                },
                Answer = x.Answer,
                Question = new QuestionViewModel()
                {
                    Id = x.Question.Id,
                    Name = x.Question.Name
                }
            });
        }

        [HttpGet]
        public SurveyDetailViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public SurveyDetailViewModel Create(SurveyDetailViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            return repository.Create(item.ToEntity()).ToViewModel();
        }

        [HttpPut]
        public SurveyDetailViewModel Update(Guid id, SurveyDetailViewModel item)
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