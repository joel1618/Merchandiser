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
    public class ProductCategoryApiController : ApiController
    {
        ProductCategoryRepository repository;
        UserRoleRepository userRoleRepository;
        public ProductCategoryApiController()
        {
            this.repository = new ProductCategoryRepository();
            this.userRoleRepository = new UserRoleRepository();
        }

        [HttpGet]
        public IQueryable<ProductViewModel> Search(Guid companyId)
        {
            var userId = User.Identity.GetUserId();
            var response = repository.Search().FilterAllByUserAndCompany(userId, companyId, null, "CompanyId", "Id", userRoleRepository).Select(x => new ProductViewModel()
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                Name = x.Name,
                Created = x.Created
            });
            return response;
        }

        [HttpGet]
        public ProductCategoryViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public IHttpActionResult Create(ProductCategoryViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            var record = repository.Search().Where(e => e.CompanyId == item.CompanyId && e.Name == item.Name).FirstOrDefault();
            if (record != null)
            {
                return BadRequest("This record already exists.");
            }
            var response = repository.Create(item.ToEntity()).ToViewModel();
            return Ok(response);
        }

        [HttpPut]
        public ProductCategoryViewModel Update(Guid id, ProductCategoryViewModel item)
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