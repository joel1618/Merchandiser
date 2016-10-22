using Breeze.WebApi2;
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
        public SurveyHeaderApiController()
        {
            this.context = new MerchandiserEntities();
            this.repository = new SurveyHeaderRepository(context);
            this.detailRepository = new SurveyDetailRepository(context);
            this.imageApiController = new ImageApiController();
        }

        [HttpGet]
        public IQueryable<SurveyHeaderViewModel> Search()
        {
            var response = repository.Search().Select(x => new SurveyHeaderViewModel()
            {
                Id = x.Id,
                Created = x.Created,
                Notes = x.Notes,
                IsBeforeImage = x.IsBeforeImage,
                IsAfterImage = x.IsAfterImage,
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
                }
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