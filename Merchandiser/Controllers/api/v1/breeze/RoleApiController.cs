using Breeze.WebApi2;
using Merchandiser.Models;
using Merchandiser.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1.breeze
{
    [BreezeController]
    public class RoleApiController : ApiController
    {
        AspNetRoleRepository repository;
        public RoleApiController()
        {
            this.repository = new AspNetRoleRepository();
        }

        [HttpGet]
        public IQueryable<RoleViewModel> Search()
        {
            return repository.Search().Select(x => new RoleViewModel()
            {
                Id = x.Id,
                Name = x.Name
            });
        }
    }
}