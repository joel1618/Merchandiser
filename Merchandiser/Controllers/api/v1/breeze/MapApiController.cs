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
    public class MapApiController : ApiController
    {
        public MapRepository repository;
        public MapApiController()
        {
            this.repository = new MapRepository();
        }

        public IQueryable<MapViewModel> Search()
        {
            return repository.Search().Select(x => new MapViewModel()
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Created = x.Created,
                Latitude = x.Latitude,
                Longitude = x.Longitude
            });
        }
    }
}