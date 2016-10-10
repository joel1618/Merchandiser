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
    public class ProductApiController : ApiController
    {
        ProductRepository productRepository;
        UserRoleRepository userRoleRepository;
        ProductCategoryRepository productCategoryRepository;
        public ProductApiController()
        {
            this.productRepository = new ProductRepository();
            this.userRoleRepository = new UserRoleRepository();
            this.productCategoryRepository = new ProductCategoryRepository();
        }

        [HttpGet]
        public IQueryable<ProductViewModel> Search(Guid companyId)
        {
            var userId = User.Identity.GetUserId();
            var response = productRepository.Search().FilterAllByUserAndCompany(userId, companyId, null, "CompanyId", "Id", userRoleRepository).Select(x => new ProductViewModel()
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                ProductCategoryId = x.ProductCategoryId,
                Name = x.Name,
                Created = x.Created,
                ProductCategory = x.ProductCategory != null ? new ProductCategoryViewModel()
                {
                    Id = x.ProductCategory.Id,
                    Name = x.ProductCategory.Name
                } : null
            });
            return response;
        }

        [HttpGet]
        public ProductViewModel Get(Guid id)
        {
            return productRepository.Get(id).ToViewModel();
        }

        [HttpPost]
        public IHttpActionResult Create(ProductViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            var record = productRepository.Search().Where(e => e.CompanyId == item.CompanyId && e.Name == item.Name).FirstOrDefault();
            if (record != null)
            {
                return BadRequest("This record already exists.");
            }
            var response = productRepository.Create(item.ToEntity()).ToViewModel();
            if (response.ProductCategoryId.HasValue)
            {
                response.ProductCategory = productCategoryRepository.Get(response.ProductCategoryId.Value).ToViewModel();
            }
            return Ok(response);
        }

        [HttpPut]
        public IHttpActionResult Update(Guid id, ProductViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            var record = productRepository.Search().Where(e => e.CompanyId == item.CompanyId && e.Name == item.Name && e.Id != item.Id).FirstOrDefault();
            if (record != null)
            {
                return BadRequest("This record already exists.");
            }
            var response = productRepository.Update(id, item.ToEntity()).ToViewModel();
            return Ok(response);
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            productRepository.Delete(id);
        }
    }
}