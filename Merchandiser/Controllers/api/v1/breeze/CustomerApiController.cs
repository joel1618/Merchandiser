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
    public class CustomerApiController : ApiController
    {
        CustomerRepository customerRepository;
        public CustomerApiController()
        {
            this.customerRepository = new CustomerRepository();
        }

        [HttpGet]
        public IQueryable<CompanyViewModel> Search()
        {
            var currentUserId = User.Identity.GetUserId();
            return customerRepository.Search().Where(e => e.CreatedBy == currentUserId).Select(x => new CompanyViewModel()
            {
                Id = x.Id, 
                Name = x.Name,
                Created = x.Created
            });
        }

        [HttpGet]
        public CustomerViewModel Get(Guid id)
        {
            return customerRepository.Get(id).ToViewModel();
        }

        [HttpPost]
        public CustomerViewModel Create(CustomerViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            return customerRepository.Create(item.ToEntity()).ToViewModel();
        }

        [HttpPut]
        public CustomerViewModel Update(Guid id, CustomerViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            return customerRepository.Update(id, item.ToEntity()).ToViewModel();
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            customerRepository.Delete(id);
        }
    }
}