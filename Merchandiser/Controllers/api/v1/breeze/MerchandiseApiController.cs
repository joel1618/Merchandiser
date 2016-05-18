﻿using System;
using System.Linq;
using System.Web.Http;
using Breeze.WebApi2;
using Merchandiser.Repositories;
using Microsoft.AspNet.Identity;
using MerchandiseEntity = Merchandiser.Merchandise;

namespace Merchandiser.Controllers.api.v1
{
    [BreezeController]
    public class MerchandiseApiController : ApiController
    {
        [HttpGet]
        public IQueryable<MerchandiseEntity> Search()
        {
            MerchandiseRepository merchandiseRepository = new MerchandiseRepository();
            return merchandiseRepository.Search();
        } 

        [HttpPost]
        public MerchandiseEntity Create(MerchandiseEntity item)
        {
            MerchandiseRepository merchandiseRepository = new MerchandiseRepository();
            item.Id = Guid.NewGuid().ToString();
            item.AspNetUsersId = User.Identity.GetUserId();
            item.Latitude = Math.Round(decimal.Parse(item.Latitude.HasValue ? item.Latitude.Value.ToString() : ""), 6);
            item.Longitude = Math.Round(decimal.Parse(item.Longitude.HasValue ? item.Longitude.Value.ToString() : ""), 6);
            item.CreatedDateTime = DateTime.Now;
            return merchandiseRepository.Create(item);
        }
    }
}