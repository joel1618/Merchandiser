using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.ExceptionHandling;
using System.Web;
using RollbarSharp;

namespace Merchandiser.App_Start
{
    public class WebApiGlobalExceptionHandler : ExceptionHandler
    {
        public override void Handle(ExceptionHandlerContext context)
        {
            (new RollbarClient()).SendException(context.Exception);
        }
    }
}