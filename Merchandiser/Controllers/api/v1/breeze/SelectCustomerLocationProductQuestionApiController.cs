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
            join productTypeDetail in context.ProductTypeDetails on sclpq.Product.ProductTypeHeaderId equals productTypeDetail.ProductTypeHeaderId into ps
            from productTypeDetail in ps.DefaultIfEmpty()
            select new SelectCustomerLocationProductQuestionViewModel()
            {
                Id = sclpq.Id,
                CompanyId = sclpq.CompanyId,
                SurveyId = sclpq.SurveyId,
                CustomerId = sclpq.CustomerId,
                LocationId = sclpq.LocationId,
                ProductId = sclpq.ProductId,
                ProductTypeDetailId = productTypeDetail != null ? productTypeDetail.Id : new Nullable<Guid>(),
                Company = new CompanyViewModel()
                {
                    Id = sclpq.Company.Id,
                    Name = sclpq.Company.Name,
                    Created = sclpq.Company.Created,
                    CreatedBy = sclpq.Company.CreatedBy
                },
                Created = sclpq.Created,
                CreatedBy = sclpq.CreatedBy,
                Customer = new CustomerViewModel()
                {
                    Id = sclpq.Customer.Id,
                    Name = sclpq.Customer.Name
                },
                Location = new LocationViewModel()
                {
                    Id = sclpq.Location.Id,
                    Name = sclpq.Location.Name,
                    Address = sclpq.Location.Address,
                    AreaManager = sclpq.Location.AreaManager,
                    City = sclpq.Location.City,
                    State = sclpq.Location.State,
                    Zip = sclpq.Location.Zip,
                    Phone = sclpq.Location.Phone
                },
                Modified = sclpq.Modified,
                ModifiedBy = sclpq.ModifiedBy,
                Product = new ProductViewModel()
                {
                    Id = sclpq.Product.Id,
                    Name = sclpq.Product.Name
                },
                Question = new QuestionViewModel()
                {
                    Id = sclpq.Question.Id,
                    Name = sclpq.Question.Name,
                    IsRequired = sclpq.Question.IsRequired,
                    IsTrueFalse = sclpq.Question.IsTrueFalse
                },
                QuestionId = sclpq.QuestionId,
                RowOrder = sclpq.RowOrder,
                Survey = new SurveyViewModel()
                {
                    Id = sclpq.Survey.Id,
                    Name = sclpq.Survey.Name,
                    IsNoteRequired = sclpq.Survey.IsNoteRequired
                },
                ProductTypeDetail = productTypeDetail != null ? new ProductTypeDetailViewModel()
                {
                    Id = productTypeDetail.Id,
                    Name = productTypeDetail.Name
                } : null
            };
            return response;
        }
    }
}