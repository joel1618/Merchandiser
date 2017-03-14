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
        UserRoleRepository userRoleRepository;
        SurveyCustomerLocationProductQuestionRepository surveyCLPQRepository;
        public BuildSurveyApiController()
        {
            this.userRoleRepository = new UserRoleRepository();
            this.surveyCLPQRepository = new SurveyCustomerLocationProductQuestionRepository();
        }

        [HttpPost]
        public IHttpActionResult Create(BuildSurveyViewModel model)
        {
            try
            {
                var record = new SurveyCustomerLocationProductQuestion();
                for (int customerIndex = 0; customerIndex < model.Customers.Count; customerIndex++)
                {
                    for (int locationIndex = 0; locationIndex < model.Locations.Count; locationIndex++)
                    {
                        for (int productIndex = 0; productIndex < model.Products.Count; productIndex++)
                        {
                            for (int questionIndex = 0; questionIndex < model.Questions.Count; questionIndex++)
                            {
                                surveyCLPQRepository.Create(new SurveyCustomerLocationProductQuestion()
                                {
                                    CompanyId = model.CompanyId,
                                    SurveyId = model.SurveyId,
                                    CustomerId = model.Customers[customerIndex].Id,
                                    LocationId = model.Locations[locationIndex].Id,
                                    ProductId = model.Products[productIndex].Id,
                                    QuestionId = model.Questions[questionIndex].Id,
                                    CreatedBy = User.Identity.GetUserId()
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return Ok();
        }
    }
}