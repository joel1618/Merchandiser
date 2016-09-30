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
    public class QuestionApiController : ApiController
    {
        QuestionRepository repository;
        UserRoleRepository userRoleRepository;
        public QuestionApiController()
        {
            this.repository = new QuestionRepository();
            this.userRoleRepository = new UserRoleRepository();
        }

        [HttpGet]
        public IQueryable<QuestionViewModel> Search(Guid companyId)
        {
            var userId = User.Identity.GetUserId();
            var response = repository.Search().FilterAllByUserAndCompany(userId, companyId, null, "CompanyId", "Id", userRoleRepository).Select(x => new QuestionViewModel()
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                Name = x.Name,
                Created = x.Created
            });
            return response;
        }

        [HttpGet]
        public QuestionViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public QuestionViewModel Create(QuestionViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            return repository.Create(item.ToEntity()).ToViewModel();
        }

        [HttpPut]
        public QuestionViewModel Update(Guid id, QuestionViewModel item)
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