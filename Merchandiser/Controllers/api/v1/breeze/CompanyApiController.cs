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
    public class CompanyApiController : ApiController
    {
        CompanyRepository companyRepository;
        public CompanyApiController()
        {
            this.companyRepository = new CompanyRepository();
        }

        [HttpGet]
        public IQueryable<CompanyViewModel> Search()
        {
            var currentUserId = User.Identity.GetUserId();
            var companiesList = companyRepository.Search().Where(e => e.CreatedBy.Equals(currentUserId)).Select(x => new CompanyViewModel()
            {
                Id = x.Id,
                Name = x.Name,
                Created = x.Created,
                CreatedBy = x.CreatedBy
            });
            return companiesList;
        }

        [HttpGet]
        public CompanyViewModel Get(Guid id)
        {
            return companyRepository.Get(id).ToViewModel();
        }

        [HttpPost]
        public CompanyViewModel Create(CompanyViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            return companyRepository.Create(item.ToEntity()).ToViewModel();
        }

        [HttpPut]
        public CompanyViewModel Update(Guid id, CompanyViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            return companyRepository.Update(id, item.ToEntity()).ToViewModel();
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            companyRepository.Delete(id);
        }
    }
}