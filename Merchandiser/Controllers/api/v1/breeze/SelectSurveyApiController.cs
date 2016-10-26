using Breeze.WebApi2;
using Merchandiser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1.breeze
{
    [BreezeController]
    public class SelectSurveyApiController : ApiController
    {
        MerchandiserEntities context;
        public SelectSurveyApiController()
        {
            this.context = new MerchandiserEntities();
        }

        [HttpGet]
        public IQueryable<SelectSurveyViewModel> Search(Guid companyId)
        {
            return context.SelectSurveys.Select(x => new SelectSurveyViewModel()
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                CustomerId = x.CustomerId,
                LocationId = x.CustomerId,
                Name = x.Name,
                SurveyCreated = x.SurveyCreated
            });
        }
    }
}