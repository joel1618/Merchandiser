using Breeze.WebApi2;
using Merchandiser.Models;
using Merchandiser.Models.Extensions;
using Merchandiser.Repositories;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1.breeze
{
    [BreezeController]
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
            var response = repository.Search().Select(x => new UserRoleViewModel()
            {
                Id = x.Id,
                UserId = x.UserId,
                RoleId = x.RoleId,
                CompanyId = x.CompanyId,
                Company = new CompanyViewModel()
                {
                    Id = x.Company.Id,
                    Name = x.Company.Name
                },
                User = new UserViewModel()
                {
                    Id = x.AspNetUser.Id,
                    UserName = x.AspNetUser.UserName
                },
                Role = new RoleViewModel()
                {
                    Id = x.AspNetRole.Id,
                    Name = x.AspNetRole.Name
                }
            });
            return response;
        }

        [HttpGet]
        public UserRoleViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public UserRoleViewModel Create(UserRoleViewModel item)
        {
            var manager = System.Web.HttpContext.Current.Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            var user = manager.FindByEmail(item.User.UserName);
            item.UserId = user.Id;
            return repository.Create(item.ToEntity()).ToViewModel();
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            repository.Delete(id);
        }
    }
}