﻿using Microsoft.AspNet.Identity;
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

        public Question Get(int id)
        {
            return context.Questions.Find(id);
        }

        public Question Create(Question item)
        {
            item.Created = DateTime.UtcNow;
            context.Questions.Add(item);
            context.SaveChanges();
            return item;
        }

        public Question Update(int id, Question item)
        {
            var entity = context.Questions.Find(id);
            entity.Name = item.Name;
            entity.IsRequired = item.IsRequired;
            entity.IsTrueFalse = item.IsTrueFalse;
            entity.Modified = DateTime.UtcNow;
            context.SaveChanges();
            return entity;
        }

        public void Delete(int id)
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