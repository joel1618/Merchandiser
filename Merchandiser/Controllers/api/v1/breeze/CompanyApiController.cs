﻿using Breeze.WebApi2;
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
    [BreezeController]
    public class CompanyApiController : ApiController
    {
        CompanyRepository companyRepository;
        CompanyUserRepository companyUserRepository;
        public CompanyApiController()
        {
            this.companyRepository = new CompanyRepository();
            this.companyUserRepository = new CompanyUserRepository();
        }

        [HttpGet]
        public IQueryable<CompanyViewModel> Search()
        {
            var companies = companyUserRepository.Search().Where(e => e.UserId == User.Identity.GetUserId()).Select(x => x.CompanyId).ToList();
            return companyRepository.Search().Where(e => companies.Contains(e.Id) || e.CreatedBy == User.Identity.GetUserId()).Select(x => new CompanyViewModel()
            {
                Id = x.Id, 
                Name = x.Name
            });
        }

        [HttpGet]
        public Company Get(Guid id)
        {
            return companyRepository.Get(id);
        }

        [HttpPost]
        public Company Create(Company item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            return companyRepository.Create(item);
        }

        [HttpPut]
        public Company Update(Guid id, Company item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            return companyRepository.Update(id, item);
        }

        [HttpDelete]
        public Company Delete(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}