﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web;

namespace Merchandiser.Controllers
{
    public class TemplateController : Controller
    {
        public ActionResult Index()
        {
            return PartialView();
        }
    }
}