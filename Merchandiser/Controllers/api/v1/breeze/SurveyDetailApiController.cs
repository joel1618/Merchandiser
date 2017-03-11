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
    public class SurveyDetailApiController : ApiController
    {
        MerchandiserEntities context;
        SurveyDetailRepository repository;
        UserRoleRepository userRoleRepository;
        public SurveyDetailApiController()
        {
            this.context = new MerchandiserEntities();
            this.repository = new SurveyDetailRepository(context);
            this.userRoleRepository = new UserRoleRepository();
        }

        [HttpGet]
        public IQueryable<SurveyDetailViewModel> Search(int companyId)
        {
            var userId = User.Identity.GetUserId();
            return repository.Search().FilterAllByUserAndCompany(userId, companyId, "CreatedBy", "CompanyId", null, userRoleRepository).Select(x => new SurveyDetailViewModel()
            {
                Id = x.Id,
                Created = x.Created,
                SurveyHeaderId = x.SurveyHeaderId,
                ProductId = x.ProductId,                
                CompanyId = x.CompanyId,
                QuestionId = x.QuestionId,
                Product = new ProductViewModel()
                {
                    Id = x.Product.Id,
                    Name = x.Product.Name
                },
                Answer = x.Answer,
                Question = new QuestionViewModel()
                {
                    Id = x.Question.Id,
                    Name = x.Question.Name,
                    IsRequired = x.Question.IsRequired
                },
                ProductTypeDetail = new ProductTypeDetailViewModel()
                {
                    Name = x.ProductTypeDetail.Name                    
                },
                ProductTypeDetailId = x.ProductTypeDetail != null ? x.ProductTypeDetail.Id : new Nullable<int>()
            });
        }

        [HttpGet]
        public SurveyDetailViewModel Get(int id)
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
        public SurveyDetailViewModel Update(int id, SurveyDetailViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            return repository.Update(id, item.ToEntity()).ToViewModel();
        }

        [HttpDelete]
        public void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}