﻿using Breeze.WebApi2;
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
        public ProductApiController()
        {
            this.productRepository = new ProductRepository();
            this.userRoleRepository = new UserRoleRepository();
        }

        [HttpGet]
        public IQueryable<ProductViewModel> Search(Guid companyId)
        {
            var userId = User.Identity.GetUserId();
            var response = productRepository.Search().FilterAllByUserAndCompany(userId, companyId, null, "CompanyId", "Id", userRoleRepository).Select(x => new ProductViewModel()
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                Name = x.Name,
                Created = x.Created
            });
            return response;
        }

        [HttpGet]
        public ProductViewModel Get(Guid id)
        {
            return productRepository.Get(id).ToViewModel();
        }

        [HttpPost]
        public ProductViewModel Create(ProductViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            return productRepository.Create(item.ToEntity()).ToViewModel();
        }

        [HttpPut]
        public ProductViewModel Update(Guid id, ProductViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            return productRepository.Update(id, item.ToEntity()).ToViewModel();
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            productRepository.Delete(id);
        }
    }
}