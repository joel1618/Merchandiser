using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.ExceptionHandling;
using System.Web;
using RollbarSharp;
using System.Configuration;

namespace Merchandiser.App_Start
{
    public class WebApiGlobalExceptionHandler : ExceptionHandler
    {
        public override void Handle(ExceptionHandlerContext context)
        {
            var config = new RollbarSharp.Configuration("ae90b2c565624ab9b66145339bfb0ebf");
            config.Environment = ConfigurationManager.AppSettings["Rollbar.Environment"];
            var rollbarClient = new RollbarClient(config);
            rollbarClient.SendException(context.Exception);
        }
    }
}