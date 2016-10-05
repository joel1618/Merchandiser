using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class QuestionRepository
    {
        MerchandiserEntities context;
        public QuestionRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<Question> Search()
        {
            return context.Questions;
        }

        public Question Get(Guid id)
        {
            return context.Questions.Find(id);
        }

        public Question Create(Question item)
        {
            item.Id = Guid.NewGuid();
            item.Created = DateTime.UtcNow;
            context.Questions.Add(item);
            context.SaveChanges();
            return item;
        }

        public Question Update(Guid id, Question item)
        {
            var entity = context.Questions.Find(id);
            entity.Name = item.Name;
            entity.Modified = DateTime.UtcNow;
            context.SaveChanges();
            return entity;
        }

        public void Delete(Guid id)
        {
            var item = Get(id);
            if (item != null)
            {
                context.Questions.Remove(item);
            };
            context.SaveChanges();
        }
    }
}