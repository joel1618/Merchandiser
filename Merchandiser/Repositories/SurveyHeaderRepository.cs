using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class SurveyHeaderRepository
    {
        MerchandiserEntities context;
        public SurveyHeaderRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<SurveyHeader> Search()
        {
            return context.SurveyHeaders;
        }

        public SurveyHeader Get(Guid id)
        {
            return context.SurveyHeaders.Find(id);
        }

        public SurveyHeader Create(SurveyHeader item)
        {
            item.Id = Guid.NewGuid();
            item.Created = DateTime.UtcNow;
            context.SurveyHeaders.Add(item);
            context.SaveChanges();
            return item;
        }

        public SurveyHeader Update(Guid id, SurveyHeader item)
        {
            var entity = context.SurveyHeaders.Find(id);
            context.SaveChanges();
            return entity;
        }

        public void Delete(Guid id)
        {
            var item = new SurveyHeader { Id = id };
            context.SurveyHeaders.Attach(item);
            context.SurveyHeaders.Remove(item);
            context.SaveChanges();
        }
    }
}