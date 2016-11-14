using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class LocationRepository
    {
        MerchandiserEntities context;
        public LocationRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<Location> Search()
        {
            return context.Locations;
        }

        public Location Get(Guid id)
        {
            return context.Locations.Find(id);
        }

        public Location Create(Location item)
        {
            item.Id = Guid.NewGuid();
            item.Created = DateTime.UtcNow;
            context.Locations.Add(item);
            context.SaveChanges();
            return item;
        }

        public Location Update(Guid id, Location item)
        {
            var entity = context.Locations.Find(id);
            entity.Name = item.Name;
            entity.Store = item.Store;
            entity.AreaManager = item.AreaManager;
            entity.Address = item.Address;
            entity.Modified = DateTime.UtcNow;
            entity.Latitude = item.Latitude;
            entity.Longitude = item.Longitude;
            entity.City = item.City;
            entity.State = item.State;
            entity.Zip = item.Zip;
            entity.Phone = item.Phone;
            context.SaveChanges();
            return entity;
        }

        public void Delete(Guid id)
        {
            var item = Get(id);
            if (item != null)
            {
                context.Locations.Remove(item);
            };
            context.SaveChanges();
        }
    }
}