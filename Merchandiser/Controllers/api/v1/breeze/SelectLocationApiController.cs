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
    public class SelectLocationApiController : ApiController
    {
        MerchandiserEntities context;
        public SelectLocationApiController()
        {
            this.context = new MerchandiserEntities();
        }

        [HttpGet]
        public IQueryable<SelectLocationViewModel> Search(Guid companyId)
        {
            return context.SelectLocations.Select(x => new SelectLocationViewModel()
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                Address = x.Address,
                CustomerId = x.CustomerId,
                Name = x.Name,
                SurveyCreated = x.SurveyCreated,
                Latitude = x.Latitude,
                Longitude = x.Longitude
            });
        }
    }
}