using Breeze.WebApi2;
using Merchandiser.ControllerHelpers;
using Merchandiser.Models;
using Merchandiser.Models.Extensions;
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
    public class LocationApiController : ApiController
    {
        LocationRepository locationRepository;
        UserRoleRepository userRoleRepository;
        public LocationApiController()
        {
            this.locationRepository = new LocationRepository();
            this.userRoleRepository = new UserRoleRepository();
        }

        [HttpGet]
        public IQueryable<LocationViewModel> Search(Guid companyId)
        {
            var userId = User.Identity.GetUserId();
            var response = locationRepository.Search().FilterAllByUserAndCompany(userId, companyId, null, "CompanyId", "Id", userRoleRepository).Select(x => new LocationViewModel()
            {
                Id = x.Id,
                CompanyId = x.CompanyId,
                Name = x.Name,
                Created = x.Created,
                AreaManager = x.AreaManager,
                Address = x.Address
            });
            return response;
        }

        [HttpGet]
        public LocationViewModel Get(Guid id)
        {
            return locationRepository.Get(id).ToViewModel();
        }

        [HttpPost]
        public LocationViewModel Create(LocationViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            return locationRepository.Create(item.ToEntity()).ToViewModel();
        }

        [HttpPut]
        public LocationViewModel Update(Guid id, LocationViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            return locationRepository.Update(id, item.ToEntity()).ToViewModel();
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            locationRepository.Delete(id);
        }
    }
}