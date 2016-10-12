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


            #if DEBUG
            Database.SetInitializer(new Merchandiser.Migrations.Configuration());
            MerchandiserEntities db = new MerchandiserEntities();
            db.Database.Initialize(true);
            #endif
        }

        //SSL Redirect
        protected void Application_BeginRequest()
        {
            if (!Context.Request.IsSecureConnection)
            {
                // This is an insecure connection, so redirect to the secure version
                UriBuilder uri = new UriBuilder(Context.Request.Url);
                uri.Scheme = "https";
                if (uri.Port > 32000 && uri.Host.Equals("localhost"))
                {
                    // Development box - set uri.Port to 44300 by default
                    uri.Port = 44347;
                }
                else
                {
                    uri.Port = 443;
                }

                Response.Redirect(uri.ToString());
            }
        }

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
            //Exception exception = Server.GetLastError();
           
            //Server.ClearError();
        }


    }
}
