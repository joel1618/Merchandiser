using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class SurveyCustomerLocationRepository
    {
        MerchandiserEntities context;
        public SurveyCustomerLocationRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<SurveyCustomerLocation> Search()
        {
            return context.SurveyCustomerLocations;
        }

        public SurveyCustomerLocation Get(Guid id)
        {
            return context.SurveyCustomerLocations.Find(id);
        }

        public SurveyCustomerLocation Create(SurveyCustomerLocation item)
        {
            item.Id = Guid.NewGuid();
            item.Created = DateTime.UtcNow;
            context.SurveyCustomerLocations.Add(item);
            context.SaveChanges();
            return item;
        }

        public SurveyCustomerLocation Update(Guid id, SurveyCustomerLocation item)
        {
            var entity = context.SurveyCustomerLocations.Find(id);
            entity.Modified = DateTime.UtcNow;
            context.SaveChanges();
            return entity;
        }

        public void Delete(Guid id)
        {
            var item = new SurveyCustomerLocation { Id = id };
            context.SurveyCustomerLocations.Attach(item);
            context.SurveyCustomerLocations.Remove(item);
            context.SaveChanges();
        }
    }
}