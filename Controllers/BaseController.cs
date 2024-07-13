using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using IrigasiManganti.Data;
using IrigasiManganti.Helpers;

namespace IrigasiManganti.Controllers
{
    public class BaseController : Controller
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var _context = filterContext.HttpContext.RequestServices.GetRequiredService<IrigasiMangantiContext>();   
            
            base.OnActionExecuting(filterContext);         
        }
    }
}