using Merchandiser.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1.breeze
{
    public class ReportApiController : ApiController
    {
        ReportRepository repository;
        CompanyRepository companyRepository;
        UserRoleRepository userRoleRepository;
        RoleRepository roleRepository;
        public ReportApiController()
        {
            this.repository = new ReportRepository();
            this.companyRepository = new CompanyRepository();
            this.userRoleRepository = new UserRoleRepository();
            this.roleRepository = new RoleRepository();
        }

        [Route("api/v1/ReportApi/Search/{companyId}/{surveyHeaderId}/{customerId}/{locationId}/{productId}/{surveyId}/{userId}/{page}/{pageSize}")]
        [HttpGet]
        public IHttpActionResult Search(Guid? companyId, Guid? surveyHeaderId, Guid? customerId, Guid? locationId, Guid? productId, Guid? surveyId, string userId, int? page, int? pageSize)
        {
            Guid? _companyId = null, _surveyHeaderId = null, _customerId = null, _locationId = null, _productId = null, _surveyId = null;
            int? _page = page, _pageSize = pageSize;
            string _userId = null;
            var _currentUserId = User.Identity.GetUserId();            
            if (page == null) { _page = 0; }
            if(pageSize == null){ _pageSize = 100; }
            if(companyId == null)
            {
                var _userRole = userRoleRepository.Search().Where(e => e.UserId == _currentUserId).FirstOrDefault();
                if(_userRole == null) { return BadRequest("This user does not have a role setup for any company."); }
                var _role = roleRepository.Search().Where(e => e.Id == _userRole.RoleId).FirstOrDefault();
                if (_role.Name == "Administrator")
                {
                    _companyId = _userRole.CompanyId;
                }
                else if(_role.Name == "Customer")
                {
                    _customerId = _userRole.CustomerId;
                }
                else
                {
                    _companyId = _userRole.CompanyId;
                    _userId = _userRole.UserId;
                }
            }
            else
            {
                var _userRole = userRoleRepository.Search().Where(e => e.UserId == _currentUserId && e.CompanyId == companyId.Value).FirstOrDefault();
                if(_userRole == null) { return BadRequest("This user does not have a role setup for the specified company."); }                
                var _role = roleRepository.Search().Where(e => e.Id == _userRole.RoleId).FirstOrDefault();
                if (_role.Name == "Administrator")
                {
                        
                }
                else if (_role.Name == "Customer")
                {
                    _customerId = _userRole.CustomerId;
                }
                else
                {
                    _userId = _userRole.UserId;
                }
            }
            
            var response = repository.Search(_companyId.Value, _surveyHeaderId, _customerId, _locationId, _productId, _surveyId, _userId, _page.Value, _pageSize.Value);
            return Ok(response);
        }
    }
}