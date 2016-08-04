using Merchandiser.Repositories;
using System.Web.Mvc;
//using MerchandiseEntity = Merchandiser.Merchandise;

namespace Merchandiser.Controllers
{
    public class MerchandiseController : Controller
    {
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }
    }
}