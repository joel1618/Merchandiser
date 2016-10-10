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
    public class CustomerApiController : ApiController
    {
        CustomerRepository customerRepository;
        UserRoleRepository userRoleRepository;
        public CustomerApiController()
        {
            this.customerRepository = new CustomerRepository();
            this.userRoleRepository = new UserRoleRepository();
        }

        [HttpGet]
        public IQueryable<CustomerViewModel> Search(Guid companyId)
        {
            var userId = User.Identity.GetUserId();
            var response = customerRepository.Search().FilterAllByUserAndCompany(userId, companyId, null, "CompanyId", "Id", userRoleRepository).Select(x => new CustomerViewModel()
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                Name = x.Name,
                Created = x.Created
            });
            return response;
        }

        [HttpGet]
        public CustomerViewModel Get(Guid id)
        {
            return customerRepository.Get(id).ToViewModel();
        }

        [HttpPost]
        public IHttpActionResult Create(CustomerViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            var record = customerRepository.Search().Where(e => e.CompanyId == item.CompanyId && e.Name == item.Name).FirstOrDefault();
            if(record != null)
            {
                return BadRequest("This record already exists.");
            }
            var response = customerRepository.Create(item.ToEntity()).ToViewModel();
            return Ok(response);
        }

        [HttpPut]
        public IHttpActionResult Update(Guid id, CustomerViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            var record = customerRepository.Search().Where(e => e.CompanyId == item.CompanyId && e.Name == item.Name && e.Id != item.Id).FirstOrDefault();
            if (record != null)
            {
                return BadRequest("This record already exists.");
            }
            var response = customerRepository.Update(id, item.ToEntity()).ToViewModel();
            return Ok(response);
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            customerRepository.Delete(id);
        }
    }
}