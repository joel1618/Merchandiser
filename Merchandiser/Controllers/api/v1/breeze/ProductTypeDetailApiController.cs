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
    public class ProductTypeDetailApiController : ApiController
    {
        ProductTypeDetailRepository repository;
        public ProductTypeDetailApiController()
        {
            this.repository = new ProductTypeDetailRepository();
        }

        [HttpGet]
        public IQueryable<ProductTypeDetailViewModel> Search(Guid companyId)
        {
            var userId = User.Identity.GetUserId();
            var response = repository.Search().Select(x => new ProductTypeDetailViewModel()
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                Name = x.Name,
                Created = x.Created,
                CreatedBy = x.CreatedBy,
                Modified = x.Modified,
                ModifiedBy = x.ModifiedBy,
                ProductTypeHeaderId = x.ProductTypeHeaderId
            });
            return response;
        }

        [HttpGet]
        public ProductTypeDetailViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public IHttpActionResult Create(ProductTypeDetailViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            var record = repository.Search().Where(e => e.CompanyId == item.CompanyId && e.Name == item.Name).FirstOrDefault();
            if (record != null)
            {
                return Content(System.Net.HttpStatusCode.BadRequest, "This record already exists.");
            }
            var response = repository.Create(item.ToEntity()).ToViewModel();
            return Ok(response);
        }

        [HttpPut]
        public IHttpActionResult Update(Guid id, ProductTypeDetailViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            var record = repository.Search().Where(e => e.CompanyId == item.CompanyId && e.Name == item.Name && e.Id != item.Id).FirstOrDefault();
            if (record != null)
            {
                return Content(System.Net.HttpStatusCode.BadRequest, "This record already exists.");
            }
            var response = repository.Update(id, item.ToEntity()).ToViewModel();
            return Ok(response);
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            repository.Delete(id);
        }
    }
}