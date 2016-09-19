using Merchandiser.Repositories;
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
        public ReportApiController()
        {
            this.repository = new ReportRepository();
            this.companyRepository = new CompanyRepository();
        }

        [Route("api/v1/ReportApi/Search")]
        [HttpGet]
        public dynamic Search()
        {
            var response = repository.Search(new Guid("2FE7A26E-9EF0-4043-87C3-066954B9B8F3"), null, null, null, null, null, null, 0, 1000);
            return response;
        }
    }
}