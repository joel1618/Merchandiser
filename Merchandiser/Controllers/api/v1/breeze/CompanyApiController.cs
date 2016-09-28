﻿using Breeze.WebApi2;
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
        UserRoleRepository userRoleRepository;
        RoleRepository roleRepository;
        public CompanyApiController()
        {
            this.companyRepository = new CompanyRepository();
            this.userRoleRepository = new UserRoleRepository();
            this.roleRepository = new RoleRepository();
        }

        [HttpGet]
        public IQueryable<CompanyViewModel> Search()
        {
            //var currentUserId = User.Identity.GetUserId();
            //var roleId = roleRepository.Search().Where(e => e.Name == "Administrator").FirstOrDefault().Id;
            //var companies = userRoleRepository.Search().Where(e => e.UserId == currentUserId && e.RoleId == roleId).Select(x => x.CompanyId).ToList();
            var companiesList = companyRepository.Search().Select(x => new CompanyViewModel()
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
            var company = companyRepository.Create(item.ToEntity());
            var adminRole = roleRepository.Search().Where(e => e.Name == "Administrator").FirstOrDefault();
            userRoleRepository.Create(new AspNetUserRole()
            {
                CompanyId = company.Id,
                RoleId = adminRole.Id,
                UserId = User.Identity.GetUserId()
            });
            return company.ToViewModel();
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