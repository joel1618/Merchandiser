using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
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
            var record = new SurveyCustomerLocation();
            record.Id = Guid.NewGuid();
            record.Created = DateTime.UtcNow;
            record.CreatedBy = item.CreatedBy;
            record.SurveyId = item.SurveyId;
            record.LocationId = item.LocationId;
            record.CustomerId = item.CustomerId;
            context.SurveyCustomerLocations.Add(record);
            context.SaveChanges();
            return record;
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