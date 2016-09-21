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
        public SurveyHeaderApiController()
        {
            this.context = new MerchandiserEntities();
            this.repository = new SurveyHeaderRepository(context);
            this.detailRepository = new SurveyDetailRepository(context);
        }

        [HttpGet]
        public IQueryable<SurveyHeaderViewModel> Search()
        {
            var currentUserId = User.Identity.GetUserId();
            return repository.Search().Where(e => e.CreatedBy == currentUserId).Select(x => new SurveyHeaderViewModel()
            {
                Id = x.Id,
                Created = x.Created
            });
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
        public SurveyHeaderViewModel CreateBulk([FromBody()]SurveyHeaderDetailViewModel item)
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
            return response;
        }

        [HttpPut]
        public SurveyHeaderViewModel Update(Guid id, SurveyHeaderViewModel item)
        {
            item.ModifiedBy = User.Identity.GetUserId();
            return repository.Update(id, item.ToEntity()).ToViewModel();
        }

        [HttpPut]
        public SurveyHeaderViewModel UpdateBulk([FromUri()]Guid id, [FromBody()]SurveyHeaderDetailViewModel item)
        {
            item.Header.ModifiedBy = User.Identity.GetUserId();
            var response = repository.Update(id, item.Header.ToEntity()).ToViewModel();
            foreach (var detail in item.Details)
            {
                detail.ModifiedBy = User.Identity.GetUserId();
                detailRepository.Update(detail.Id, detail.ToEntity()).ToViewModel();
            }
            repository.SaveChanges();
            return response;
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            repository.Delete(id);
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
            repository.SaveChanges();
            return Ok();
        }
    }
}