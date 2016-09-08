using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Merchandiser.App_Start
{
    public class AdminAuthorization : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            //HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            //response.Content = new StringContent("You must be an admin to perform this action.");
            //actionContext.Response = response;
        }
    }
}