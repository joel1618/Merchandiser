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
using Merchandiser.ControllerHelpers;
using RollbarSharp;
using System.Threading.Tasks;

namespace Merchandiser.Controllers.api.v1.breeze
{
    [BreezeController]
    public class CompanyApiController : ApiController
    {
        CompanyRepository companyRepository;
        UserRoleRepository userRoleRepository;
        RoleRepository roleRepository;
        string userId;
        public CompanyApiController()
        {
            this.companyRepository = new CompanyRepository();
            this.userRoleRepository = new UserRoleRepository();
            this.roleRepository = new RoleRepository();
            this.userId = User.Identity.GetUserId();

        }

        [HttpGet]
        public IQueryable<CompanyViewModel> Search()
        {
            var companiesList = companyRepository.Search().FilterCompanyByUserAndCompany(userId, "Id", userRoleRepository)
             .Select(x => new CompanyViewModel()
             {
                 Id = x.Id,
                 Name = x.Name,
                 Created = x.Created,
                 CreatedBy = x.CreatedBy
             });
            return companiesList;
        }

        [HttpGet]
        public IHttpActionResult AdminSearch()
        {
            var response = companyRepository.Search().FilterCompanyByUserAndCompanyAndRole(userId, "Id", "Administrator", userRoleRepository, roleRepository)
                .Select(x => new CompanyViewModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Created = x.Created,
                    CreatedBy = x.CreatedBy
                });
            return Ok(response);
        }

        [HttpGet]
        public CompanyViewModel Get(Guid id)
        {
            return companyRepository.Get(id).ToViewModel();
        }

        [HttpPost]
        public IHttpActionResult Create(CompanyViewModel item)
        {
            var record = companyRepository.Search().Where(e => e.CreatedBy == userId && e.Name == item.Name).FirstOrDefault();
            if (record != null)
            {
                return BadRequest("This record already exists.");
            }

            item.CreatedBy = User.Identity.GetUserId();
            var company = companyRepository.Create(item.ToEntity());
            var adminRole = roleRepository.Search().Where(e => e.Name == "Administrator").FirstOrDefault();
            userRoleRepository.Create(new AspNetUserRole()
            {
                CompanyId = company.Id,
                RoleId = adminRole.Id,
                UserId = User.Identity.GetUserId()
            });
            return Ok(company.ToViewModel());
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