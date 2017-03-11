using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class SurveyDetailRepository
    {
        MerchandiserEntities context;
        public SurveyDetailRepository(MerchandiserEntities context)
        {
            this.context = context;
        }

        public IQueryable<SurveyDetail> Search()
        {
            return context.SurveyDetails;
        }

        public SurveyDetail Get(int id)
        {
            return context.SurveyDetails.Find(id);
        }

        public SurveyDetail Create(SurveyDetail item)
        {
            item.Modified = new Nullable<DateTime>();
            item.Created = DateTime.UtcNow;
            context.SurveyDetails.Add(item);
            return item;
        }

        public SurveyDetail Update(int id, SurveyDetail item)
        {
            var entity = context.SurveyDetails.Find(id);
            entity.Answer = item.Answer;
            entity.Modified = DateTime.UtcNow;
            return entity;
        }

        public void Delete(int id)
        {
            var item = Get(id);
            if (item != null)
            {
                context.SurveyDetails.Remove(item);
            }
        }
    }
}