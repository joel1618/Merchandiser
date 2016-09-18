using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class SurveyDetailRepository
    {
        MerchandiserEntities context;
        public SurveyDetailRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<SurveyDetail> Search()
        {
            return context.SurveyDetails;
        }

        public SurveyDetail Get(Guid id)
        {
            return context.SurveyDetails.Find(id);
        }

        public SurveyDetail Create(SurveyDetail item)
        {
            item.Id = Guid.NewGuid();
            item.Modified = new Nullable<DateTime>();
            item.Created = DateTime.UtcNow;
            context.SurveyDetails.Add(item);
            context.SaveChanges();
            return item;
        }

        public SurveyDetail Update(Guid id, SurveyDetail item)
        {
            var entity = context.SurveyDetails.Find(id);
            entity.Answer = item.Answer;
            entity.Modified = DateTime.UtcNow;
            context.SaveChanges();
            return entity;
        }

        public void Delete(Guid id)
        {
            var item = new SurveyDetail { Id = id };
            context.SurveyDetails.Attach(item);
            context.SurveyDetails.Remove(item);
            context.SaveChanges();
        }
    }
}