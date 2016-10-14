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
        ApplicationUserManager userManager;
        RoleRepository roleRepository;
        public UserRoleApiController()
        {
            this.repository = new UserRoleRepository();
            this.userManager = System.Web.HttpContext.Current.Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            this.roleRepository = new RoleRepository();
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
                CustomerId = x.CustomerId,
                Company = new CompanyViewModel()
                {
                    Id = x.Company.Id,
                    Name = x.Company.Name,
                    Created = x.Company.Created,
                    CreatedBy = x.Company.CreatedBy
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
                },
                Customer = x.Customer != null ? new CustomerViewModel()
                {
                    Id = x.Customer.Id,
                    Name = x.Customer.Name
                } : null
            });
            return response;
        }

        [HttpGet]
        public UserRoleViewModel Get(Guid id)
        {
            var item = repository.Get(id);
            var user = userManager.FindById(item.UserId);
            item.AspNetUser = new AspNetUser() { Id = user.Id, UserName = user.UserName };
            item.AspNetRole = roleRepository.Search().Where(e => e.Id == item.RoleId).FirstOrDefault();
            var response = item.ToViewModel();
            return response;
        }

        [HttpPost]
        public IHttpActionResult Create(UserRoleViewModel item)
        {
            var user = userManager.FindByEmail(item.User.UserName);
            if(user == null)
            {
                return BadRequest("The user does not exist.  Have the user create an account first.");
            }
            item.UserId = user.Id;
            var record = repository.Search().Where(e => e.CompanyId == item.CompanyId && e.UserId == user.Id && e.RoleId == item.RoleId && e.CustomerId == item.CustomerId).FirstOrDefault();
            if (record != null)
            {
                return Content(System.Net.HttpStatusCode.BadRequest, "This record already exists.");
            }
            var response = repository.Create(item.ToEntity()).ToViewModel();
            user = userManager.FindById(item.UserId);
            response.User = new UserViewModel() { Id = user.Id, UserName = user.UserName };
            response.Role = roleRepository.Search().Where(e => e.Id == item.RoleId).FirstOrDefault().ToViewModel();
            return Ok(response);
        }

        [HttpDelete]
        public IHttpActionResult Delete(Guid id)
        {
            var userRoleToDelete = repository.Get(id);
            var adminRole = roleRepository.Search().Where(e => e.Name == "Administrator").FirstOrDefault();
            var adminUserRole = repository.Search().Where(e => e.CompanyId == userRoleToDelete.CompanyId && e.RoleId == adminRole.Id).FirstOrDefault();
            if(userRoleToDelete.Id != adminUserRole.Id)
            {
                repository.Delete(id);
                return Ok();
            }
            else
            {
                return BadRequest("You cannot remove the last admin on the account.  You must designate someone else as an admin first.");
            }            
        }
    }
}