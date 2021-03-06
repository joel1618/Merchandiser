using Collision.App_Start;
using System.Web.Http;

[assembly: WebActivatorEx.PreApplicationStartMethod(
    typeof(Merchandiser.App_Start.BreezeWebApiConfig), "RegisterBreezePreStart")]
namespace Merchandiser.App_Start
{
    ///<summary>
    /// Inserts the Breeze Web API controller route at the front of all Web API routes
    ///</summary>
    ///<remarks>
    /// This class is discovered and run during startup; see
    /// http://blogs.msdn.com/b/davidebb/archive/2010/10/11/light-up-your-nupacks-with-startup-code-and-webactivator.aspx
    ///</remarks>
    public static class BreezeWebApiConfig
    {

        public static void RegisterBreezePreStart()
        {
#if DEBUG
            //MetadataScriptWriter.Write();
#endif

            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
                name: "BreezeApi",
                routeTemplate: "breeze/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}