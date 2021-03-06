﻿using Breeze.WebApi2;
using Merchandiser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
namespace Merchandiser.Controllers.api.v1.breeze
{
    [BreezeController]
    public class SelectUserApiController : ApiController
    {
        MerchandiserEntities context;
        public SelectUserApiController()
        {
            this.context = new MerchandiserEntities();
        }

        [HttpGet]
        public IQueryable<SelectUserViewModel> Search(int companyId)
        {
            var response = context.SelectUsers.Where(e => e.CompanyId == companyId).Select(x => new SelectUserViewModel()
            {
                CompanyId = x.CompanyId,
                Email = x.Email,
                FirstName = x.FirstName,
                LastName = x.LastName, 
                Id = x.Id
            });
            return response;
        }
    }
}