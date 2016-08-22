using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class SurveyRepository
    {
        MerchandiserEntities context;
        public SurveyRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<Survey> Search()
        {
            return context.Surveys;
        }

        public Survey Get(Guid id)
        {
            return context.Surveys.Find(id);
        }

        public Survey Create(Survey item)
        {
            item.Id = Guid.NewGuid();
            item.Created = DateTime.UtcNow;
            context.Surveys.Add(item);
            context.SaveChanges();
            return item;
        }

        public Survey Update(Guid id, Survey item)
        {
            var entity = context.Surveys.Find(id);
            entity.Name = item.Name;
            entity.Modified = DateTime.UtcNow;
            context.SaveChanges();
            return entity;
        }

        public void Delete(Guid id)
        {
            var item = new Survey { Id = id };
            context.Surveys.Attach(item);
            context.Surveys.Remove(item);
            context.SaveChanges();
        }
    }
}