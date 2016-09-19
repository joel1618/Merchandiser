using Merchandiser.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1.breeze
{
    public class ReportApiController : ApiController
    {
        ReportRepository repository;
        CompanyRepository companyRepository;
        UserRoleRepository userRoleRepository;
        public ReportApiController()
        {
            this.repository = new ReportRepository();
            this.companyRepository = new CompanyRepository();
            this.userRoleRepository = new UserRoleRepository();
        }

        [Route("api/v1/ReportApi/Search")]
        [HttpGet]
        public dynamic Search()
        {
            var currentUserId = User.Identity.GetUserId();
            var companies = userRoleRepository.Search().Where(e => e.UserId == currentUserId);
            var response = repository.Search(companies.FirstOrDefault().CompanyId, null, null, null, null, null, null, 0, 1000);
            return response;
        }
    }
}