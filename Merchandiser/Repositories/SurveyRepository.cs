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

        public Survey Get(int id)
        {
            return context.Surveys.Find(id);
        }

        public Survey Create(Survey item)
        {
            var now = DateTime.UtcNow;
            item.Created = now;
            context.Surveys.Add(item);
            context.SaveChanges();
            return item;
        }

        public Survey Update(int id, Survey item)
        {
            var entity = context.Surveys.Find(id);
            entity.Name = item.Name;
            entity.IsNoteRequired = item.IsNoteRequired;
            entity.IsCreate = item.IsCreate;
            entity.IsCreateDays = item.IsCreateDays;
            entity.IsEdit = item.IsEdit;
            entity.IsEditDays = item.IsEditDays;
            entity.IsDelete = item.IsDelete;
            entity.IsDeleteDays = item.IsDeleteDays;
            entity.Modified = DateTime.UtcNow;
            context.SaveChanges();
            return entity;
        }

        public void Delete(int id)
        {
            var item = Get(id);
            if (item != null)
            {
                context.Surveys.Remove(item);
            };
            context.SaveChanges();
        }
    }
}