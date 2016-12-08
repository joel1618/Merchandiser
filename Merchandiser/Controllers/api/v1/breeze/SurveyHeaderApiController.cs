using Breeze.WebApi2;
using Merchandiser.ControllerHelpers;
using Merchandiser.Models;
using Merchandiser.Models.Extensions;
using Merchandiser.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1.breeze
{
    [BreezeController]
    public class SurveyHeaderApiController : ApiController
    {
        MerchandiserEntities context;
        SurveyHeaderRepository repository;
        SurveyDetailRepository detailRepository;
        ImageApiController imageApiController;
        UserRoleRepository userRoleRepository;
        SurveyRepository surveyRepository;
        RoleRepository roleRepository;
        public SurveyHeaderApiController()
        {
            this.context = new MerchandiserEntities();
            this.repository = new SurveyHeaderRepository(context);
            this.detailRepository = new SurveyDetailRepository(context);
            this.imageApiController = new ImageApiController();
            this.userRoleRepository = new UserRoleRepository();
            this.surveyRepository = new SurveyRepository();
            this.roleRepository = new RoleRepository();
        }

        [HttpGet]
        public IQueryable<SurveyHeaderViewModel> Search(Guid companyId)
        {
            var userId = User.Identity.GetUserId();
            var response = repository.Search().FilterAllByUserAndCompany(userId, companyId, "CreatedBy", "CompanyId", "CustomerId", userRoleRepository).Select(x => new SurveyHeaderViewModel()
            {
                Id = x.Id,
                Notes = x.Notes,
                IsBeforeImage = x.IsBeforeImage,
                IsAfterImage = x.IsAfterImage,
                Latitude = x.Latitude,
                Longitude = x.Longitude,
                SurveyId = x.SurveyId,
                LocationId = x.LocationId,
                CustomerId = x.CustomerId,
                CompanyId = x.CompanyId,
                Created = x.Created,
                CreatedBy = x.CreatedBy,
                AreaManager = x.AreaManager,
                Address = x.Address,
                City = x.City,
                State = x.State,
                Zip = x.Zip,
                Phone = x.Phone,
                IsReviewed = x.IsReviewed,
                Reviewed = x.Reviewed.HasValue ? x.Reviewed.Value : new Nullable<DateTime>(),
                ReviewedBy = x.ReviewedBy,
                Company = new CompanyViewModel()
                {
                    Id = x.Company.Id,
                    Name = x.Company.Name
                },
                Location = new LocationViewModel()
                {
                    Id = x.Location.Id,
                    Name = x.Location.Name,
                    AreaManager = x.Location.AreaManager,
                    Address = x.Location.Address
                },
                Customer = new CustomerViewModel()
                {
                    Id = x.Customer.Id,
                    Name = x.Customer.Name
                },
                Survey = new SurveyViewModel()
                {
                    Id = x.Survey.Id,
                    Name = x.Survey.Name,
                    IsNoteRequired = x.Survey.IsNoteRequired
                },
                CreatedUser = new UserViewModel()
                {
                    Id = x.AspNetUser.Id,
                    UserName = x.AspNetUser.UserName
                },
                ModifiedUser = x.AspNetUser1 != null ? new UserViewModel()
                {
                    Id = x.AspNetUser1.Id,
                    UserName = x.AspNetUser1.UserName
                } : null,
                UserInfo = x.AspNetUser.AspNetUsersInfoes.FirstOrDefault() != null ? new UserInfoViewModel()
                {
                    Id = x.AspNetUser.AspNetUsersInfoes.FirstOrDefault().Id,
                    FirstName = x.AspNetUser.AspNetUsersInfoes.FirstOrDefault().FirstName,
                    LastName = x.AspNetUser.AspNetUsersInfoes.FirstOrDefault().LastName
                } : null
            });
            return response;
        }

        [HttpGet]
        public SurveyHeaderViewModel Get(Guid id)
        {
            return repository.Get(id).ToViewModel();
        }

        [HttpPost]
        public SurveyHeaderViewModel Create(SurveyHeaderViewModel item)
        {
            item.CreatedBy = User.Identity.GetUserId();
            return repository.Create(item.ToEntity()).ToViewModel();
        }

        [HttpPost]
        public IHttpActionResult CreateBulk([FromBody()]SurveyHeaderDetailViewModel item)
        {
            var id = Guid.NewGuid();
            item.Header.Id = id;
            item.Header.CreatedBy = User.Identity.GetUserId();
            if (item.Header.IsReviewed)
            {
                item.Header.ReviewedBy = User.Identity.GetUserId();
            }
            var response = repository.Create(item.Header.ToEntity()).ToViewModel();
            foreach (var detail in item.Details)
            {
                detail.SurveyHeaderId = id;
                detail.CreatedBy = User.Identity.GetUserId();
                detailRepository.Create(detail.ToEntity()).ToViewModel();
            }
            repository.SaveChanges();
            return Ok(response);
        }

        [HttpPut]
        public SurveyHeaderViewModel Update(Guid id, SurveyHeaderViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            var response = repository.Update(id, item.ToEntity()).ToViewModel();
            repository.SaveChanges();
            return response;
        }

        [HttpPut]
        public IHttpActionResult UpdateBulk([FromUri()]Guid id, [FromBody()]SurveyHeaderDetailViewModel item)
        {
            //Validate that survey is editable if not an admin.
            var userId = User.Identity.GetUserId();
            if (!ApiFilters.IsAdministrator(userId, item.Header.CompanyId, roleRepository, userRoleRepository))
            {
                var survey = surveyRepository.Get(item.Header.SurveyId);
                if (!survey.IsEdit)
                {
                    return BadRequest("The survey is set to be uneditable.");
                }
                if (survey.IsEditDays.HasValue)
                {
                    if (survey.Created.AddDays(Double.Parse(survey.IsEditDays.Value.ToString())) < DateTime.UtcNow)
                    {
                        return BadRequest("The time period has already passed to be able to edit this survey.");
                    }
                }
            }

            item.Header.ModifiedBy = User.Identity.GetUserId();
            var response = repository.Update(id, item.Header.ToEntity()).ToViewModel();
            foreach (var detail in item.Details)
            {
                detail.ModifiedBy = User.Identity.GetUserId();
                detailRepository.Update(detail.Id, detail.ToEntity()).ToViewModel();
            }
            repository.SaveChanges();
            return Ok(response);
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            repository.Delete(id);
            imageApiController.DeleteBeforeImage(id);
            imageApiController.DeleteAfterImage(id);
            repository.SaveChanges();
        }

        [HttpDelete]
        public IHttpActionResult DeleteBulk(Guid id)
        {
            //Validate that survey is deletable if not an admin.
            var userId = User.Identity.GetUserId();
            var surveyHeader = Get(id);
            var survey = surveyRepository.Get(surveyHeader.SurveyId);
            if (!ApiFilters.IsAdministrator(userId, surveyHeader.CompanyId, roleRepository, userRoleRepository))
            {
                if (!survey.IsDelete)
                {
                    return BadRequest("The survey is not deletable.");
                }
                if (survey.IsDeleteDays.HasValue)
                {
                    if (survey.Created.AddDays(Double.Parse(survey.IsDeleteDays.Value.ToString())) < DateTime.UtcNow)
                    {
                        return BadRequest("The time period has already passed to be able to delete this survey.");
                    }
                }
            }

            var details = detailRepository.Search().Where(e => e.SurveyHeaderId == id);
            foreach (var detail in details)
            {
                detailRepository.Delete(detail.Id);
            }
            repository.Delete(id);
            imageApiController.DeleteBeforeImage(id);
            imageApiController.DeleteAfterImage(id);
            repository.SaveChanges();
            return Ok();
        }


    }
}