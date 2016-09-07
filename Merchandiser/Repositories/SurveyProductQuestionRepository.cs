using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class SurveyProductQuestionRepository
    {
        MerchandiserEntities context;
        public SurveyProductQuestionRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<SurveyProductQuestion> Search()
        {
            return context.SurveyProductQuestions;
        }

        public SurveyProductQuestion Get(Guid id)
        {
            return context.SurveyProductQuestions.Find(id);
        }

        public SurveyProductQuestion Create(SurveyProductQuestion item)
        {
            var record = new SurveyProductQuestion();
            record.Id = Guid.NewGuid();
            record.SurveyId = item.SurveyId;
            record.ProductId = item.ProductId;
            record.QuestionId = item.QuestionId;
            record.CreatedBy = item.CreatedBy;
            record.Created = DateTime.UtcNow;
            record.CompanyId = item.CompanyId;
            context.SurveyProductQuestions.Add(record);
            context.SaveChanges();
            return item;
        }

        public SurveyProductQuestion Update(Guid id, SurveyProductQuestion item)
        {
            var entity = context.SurveyProductQuestions.Find(id);
            entity.Modified = DateTime.UtcNow;
            context.SaveChanges();
            return entity;
        }

        public void Delete(Guid id)
        {
            var item = new SurveyProductQuestion { Id = id };
            context.SurveyProductQuestions.Attach(item);
            context.SurveyProductQuestions.Remove(item);
            context.SaveChanges();
        }
    }
}