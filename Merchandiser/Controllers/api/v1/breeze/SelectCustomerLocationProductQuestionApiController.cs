using Breeze.WebApi2;
using Merchandiser.Models;
using Merchandiser.Models.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1.breeze
{
    [BreezeController]
    public class SelectCustomerLocationProductQuestionApiController : ApiController
    {
        MerchandiserEntities context;
        public SelectCustomerLocationProductQuestionApiController()
        {
            this.context = new MerchandiserEntities();
        }

        [HttpGet]
        public IQueryable<SelectCustomerLocationProductQuestionViewModel> Search(Guid companyId)
        {
            var response =
            from sclpq in context.SurveyCustomerLocationProductQuestions
            join productTypeDetail in context.ProductTypeDetails on sclpq.Product.ProductTypeHeaderId equals productTypeDetail.ProductTypeHeaderId
            select new SelectCustomerLocationProductQuestionViewModel()
            {
                Id = sclpq.Id,
                CompanyId = sclpq.CompanyId,
                SurveyId = sclpq.SurveyId,
                CustomerId = sclpq.CustomerId,
                LocationId = sclpq.LocationId,
                ProductId = sclpq.ProductId,
                Company = sclpq.Company.ToViewModel(),
                Created = sclpq.Created,
                CreatedBy = sclpq.CreatedBy,
                Customer = sclpq.Customer.ToViewModel(),
                Location = sclpq.Location.ToViewModel(),
                Modified = sclpq.Modified,
                ModifiedBy = sclpq.ModifiedBy,
                Product = sclpq.Product.ToViewModel(),
                Question = sclpq.Question.ToViewModel(),
                QuestionId = sclpq.QuestionId,
                RowOrder = sclpq.RowOrder,
                Survey = sclpq.Survey.ToViewModel(),
                ProductTypeDetail = productTypeDetail.ToViewModel()
            };
            return response;
        }
    }
}