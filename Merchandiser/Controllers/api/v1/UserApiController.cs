﻿using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Merchandiser.Controllers.api.v1
{
    public class UserApiController : ApiController
    {
        public UserApiController() { }

        [HttpGet]
        public IHttpActionResult GetCurrentUser()
        {
            var user = User.Identity.GetUserId();
            return Ok(user);
        }

        [HttpGet]
        public IHttpActionResult GetCurrentUsername()
        {
            var user = User.Identity.GetUserName();
            return Ok(user);
        }
    }
}