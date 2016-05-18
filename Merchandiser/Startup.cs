using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Merchandiser.Startup))]
namespace Merchandiser
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
