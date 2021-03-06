﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Merchandiser.Repositories
{
    public class SurveyCustomerLocationProductQuestionRepository
    {
        MerchandiserEntities context;
        public SurveyCustomerLocationProductQuestionRepository()
        {
            this.context = new MerchandiserEntities();
        }

        public IQueryable<SurveyCustomerLocationProductQuestion> Search()
        {
            return context.SurveyCustomerLocationProductQuestions;
        }

        public SurveyCustomerLocationProductQuestion Get(int id)
        {
            return context.SurveyCustomerLocationProductQuestions.Find(id);
        }

        public SurveyCustomerLocationProductQuestion Create(SurveyCustomerLocationProductQuestion item)
        {
            var record = new SurveyCustomerLocationProductQuestion();
            record.SurveyId = item.SurveyId;
            record.CustomerId = item.CustomerId;
            record.LocationId = item.LocationId;
            record.ProductId = item.ProductId;
            record.QuestionId = item.QuestionId;
            record.CreatedBy = item.CreatedBy;
            record.Created = DateTime.UtcNow;
            record.CompanyId = item.CompanyId;
            context.SurveyCustomerLocationProductQuestions.Add(record);
            context.SaveChanges();
            return record;
        }

        public SurveyCustomerLocationProductQuestion Update(int id, SurveyCustomerLocationProductQuestion item)
        {
            var entity = context.SurveyCustomerLocationProductQuestions.Find(id);
            entity.Modified = DateTime.UtcNow;
            entity.RowOrder = item.RowOrder;
            entity.QuestionId = item.QuestionId;
            entity.ProductId = item.ProductId;
            entity.LocationId = item.LocationId;
            entity.CustomerId = item.CustomerId;
            context.SaveChanges();
            return entity;
        }

        public void Delete(int id)
        {
            var item = Get(id);
            if (item != null)
            {
                context.SurveyCustomerLocationProductQuestions.Remove(item);
            };
            context.SaveChanges();
        }
    }
}