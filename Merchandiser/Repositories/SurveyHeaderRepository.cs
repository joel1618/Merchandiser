using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class SurveyHeaderRepository
    {
        MerchandiserEntities context;
        public SurveyHeaderRepository(MerchandiserEntities context)
        {
            this.context = context;
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
            item.Modified = new Nullable<DateTime>();
            item.Created = DateTime.UtcNow;
            context.SurveyHeaders.Add(item);
            return item;
        }

        public SurveyHeader Update(Guid id, SurveyHeader item)
        {
            var entity = context.SurveyHeaders.Find(id);
            entity.IsReviewed = item.IsReviewed;
            entity.Reviewed = item.Reviewed;
            entity.ReviewedBy = item.ReviewedBy;
            entity.Notes = item.Notes;
            entity.IsAfterImage = item.IsAfterImage;
            entity.IsBeforeImage = item.IsBeforeImage;
            return entity;
        }

        public void Delete(Guid id)
        {
            var item = Get(id);
            if (item != null)
            {
                context.SurveyHeaders.Remove(item);
            }
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}