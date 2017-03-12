using Breeze.WebApi2;
using Merchandiser.ControllerHelpers;
using Merchandiser.Models;
using Merchandiser.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1.breeze
{
    [BreezeController]
    public class BuildSurveyApiController : ApiController
    {
        MerchandiserEntities context;
        UserRoleRepository userRoleRepository;
        public BuildSurveyApiController()
        {
            this.context = new MerchandiserEntities();
            this.userRoleRepository = new UserRoleRepository();
        }

        [HttpGet]
        public IQueryable<BuildSurveyViewModel> Search(int companyId)
        {
            var userId = User.Identity.GetUserId();
            var response = this.context.vwBuildSurveys.FilterAllByUserAndCompany(userId, companyId, null, "CompanyId", "Id", userRoleRepository).Select(x => new BuildSurveyViewModel()
            {
                CompanyId = x.CompanyId,
                CustomerCreated = x.CustomerCreated,
                CustomerId = x.CustomerId,
                CustomerName = x.CustomerName,
                LocationCreated = x.LocationCreated,
                LocationId = x.LocationId,
                LocationName = x.LocationName,
                ProductCreated = x.ProductCreated,
                ProductId = x.ProductId,
                ProductName = x.ProductName,
                QuestionCreated = x.QuestionCreated,
                QuestionId = x.QuestionId,
                QuestionName = x.QuestionName,
                SurveyId = x.SurveyId
            });
            return response;
        }
    }
}