using System;
using System.Linq;
using System.Web.Http;
using Breeze.WebApi2;
using Merchandiser.Repositories;
using Microsoft.AspNet.Identity;
using MerchandiseEntity = Merchandiser.Merchandise;
using MerchandiseViewModel = Merchandiser.Models.MerchandiseViewModel;

namespace Merchandiser.Controllers.api.v1
{
    [BreezeController]
    public class MerchandiseApiController : ApiController
    {
        [HttpGet]
        public IQueryable<MerchandiseViewModel> Search()
        {
            MerchandiseRepository merchandiseRepository = new MerchandiseRepository();
            var userId = User.Identity.GetUserId();
                    return merchandiseRepository.Search().Where(e => e.AspNetUsersId == userId).Select(x => new MerchandiseViewModel()
            {
                Id = x.Id,
                Name = x.Name,
                Quantity = x.Quantity,
                CreatedDateTime = x.CreatedDateTime.ToString()
            });
        } 

        [HttpPost]
        public MerchandiseEntity Create(MerchandiseEntity item)
        {
            MerchandiseRepository merchandiseRepository = new MerchandiseRepository();
            item.Id = Guid.NewGuid().ToString();
            item.AspNetUsersId = User.Identity.GetUserId();
            item.Latitude = Math.Round(decimal.Parse(item.Latitude.HasValue ? item.Latitude.Value.ToString() : "0"), 6);
            item.Longitude = Math.Round(decimal.Parse(item.Longitude.HasValue ? item.Longitude.Value.ToString() : "0"), 6);
            item.CreatedDateTime = DateTime.Now;
            return merchandiseRepository.Create(item);
        }

        //[Route("{id}")]
        [HttpDelete]
        public void Delete(Guid id)
        {
            MerchandiseRepository merchandiseRepository = new MerchandiseRepository();
            merchandiseRepository.Delete(id);
        }
    }
}