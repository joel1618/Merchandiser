using Merchandiser.Models;
using Merchandiser.Models.Extensions;
using Merchandiser.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1.breeze
{
    public class UserRoleApiController : ApiController
    {
        UserRoleRepository repository;
        public UserRoleApiController()
        {
            this.repository = new UserRoleRepository();
        }

        [HttpGet]
        public IQueryable<UserRoleViewModel> Search()
        {
            return repository.Search().Select(x => new UserRoleViewModel()
            {
                Id = x.Id,
                UserId = x.UserId,
                RoleId = x.RoleId,
                CompanyId = x.CompanyId,
                Company = x.Company.ToViewModel(),
                User = x.AspNetUser,
                Role = x.AspNetRole
            });
        }

        [HttpGet]
        public UserRoleViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public UserRoleViewModel Create(UserRoleViewModel item)
        {
            return repository.Create(item.ToEntity()).ToViewModel();
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            repository.Delete(id);
        }
    }
}