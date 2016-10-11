using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

using System.Data.Entity;
using Merchandiser.Migrations;
using Merchandiser.App_Start;
using SharpRaven;

namespace Merchandiser
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            //GlobalFilters.Filters.Add(new RequireHttpsAttribute());
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AutoMapperConfig.RegisterMappings();
            //GlobalFilters.Filters.Add(new ExceptionHandlingAttribute());
#if DEBUG
            Database.SetInitializer(new Merchandiser.Migrations.Configuration());
            MerchandiserEntities db = new MerchandiserEntities();
            db.Database.Initialize(true);
            #endif
        }
        //SSL Redirect
        //protected void Application_BeginRequest()
        //{
        //    if (!Context.Request.IsSecureConnection)
        //        Response.Redirect(Context.Request.Url.ToString().Replace("http:", "https:"));
        //}

        //http://stackoverflow.com/questions/3285014/mvc-requirehttps-entire-site
        //protected void Application_BeginRequest(Object sender, EventArgs e)
        //{
        //    if (!HttpContext.Current.Request.IsSecureConnection)
        //    {
        //        Response.Redirect("https://" + Request.ServerVariables["HTTP_HOST"]
        //                                     + HttpContext.Current.Request.RawUrl);
        //    }
        //}

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception exception = Server.GetLastError();
            RavenClient ravenClient = new RavenClient("https://4cf38a74fd7246bfae4f01281754324b:cfa61ffc05f04437a6a92ec78c1e1616@sentry.io/105123");
            //ravenClient.CaptureException(exception);
            ravenClient.Capture(new SharpRaven.Data.SentryEvent(exception));
            Server.ClearError();
        }

        
    }
}
