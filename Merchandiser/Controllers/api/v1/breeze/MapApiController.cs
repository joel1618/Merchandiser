using Breeze.WebApi2;
using Merchandiser.ControllerHelpers;
using Merchandiser.Models;
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
    public class MapApiController : ApiController
    {
        public MapRepository repository;
        public UserRoleRepository userRoleRepository;
        public MapApiController()
        {
            this.repository = new MapRepository();
            this.userRoleRepository = new UserRoleRepository();
        }

        [HttpGet]
        public IQueryable<MapViewModel> Search(Guid companyId)
        {
            var userId = User.Identity.GetUserId();
            return repository.Search().FilterAllByUserAndCompany(userId, companyId, "UserId", "CompanyId", "CustomerId", userRoleRepository).Select(x => new MapViewModel()
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Created = x.Created,
                Latitude = x.Latitude,
                Longitude = x.Longitude,
                CompanyId = x.CompanyId,
                CustomerId = x.CustomerId,
                SurveyId = x.SurveyId,
                LocationId = x.LocationId
            });
        }
    }
}