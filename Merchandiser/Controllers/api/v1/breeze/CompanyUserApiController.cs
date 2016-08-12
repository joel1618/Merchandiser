using Merchandiser.Models;
using Merchandiser.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1.breeze
{
    public class CompanyUserApiController : ApiController
    {
        CompanyUserRepository companyUserRepository;
        public CompanyUserApiController()
        {
            this.companyUserRepository = new CompanyUserRepository();
        }

        [HttpGet]
        public IQueryable<CompanyUserViewModel> Search()
        {
            return companyUserRepository.Search().Select(x => new CompanyUserViewModel()
            {
                CompanyId = x.CompanyId,
                UserId = x.UserId
            });
        }

        [HttpGet]
        public CompanyUser Get(Guid id)
        {
            return companyUserRepository.Get(id);
        }

        [HttpPost]
        public CompanyUser Create(CompanyUser item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            return companyUserRepository.Create(item);
        }

        [HttpPut]
        public CompanyUser Update(Guid id, CompanyUser item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            return companyUserRepository.Update(id, item);
        }

        [HttpDelete]
        public CompanyUser Delete(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}