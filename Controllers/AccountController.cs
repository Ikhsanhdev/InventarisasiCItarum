using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Serilog;

using IrigasiManganti.Interfaces;
using IrigasiManganti.Services;
using IrigasiManganti.Models;
using IrigasiManganti.Models.Customs;
using IrigasiManganti.ViewModels;

namespace IrigasiManganti.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAuthService _authService;
        private readonly IUnitOfWorkRepository _unitOfWorkRepository;

        public AccountController(IAuthService authService, IUnitOfWorkRepository unitOfWorkRepository)
        {
            _authService = authService;
            _unitOfWorkRepository = unitOfWorkRepository;
        }

        public IActionResult Login()
        {
            ClaimsPrincipal claimUser = HttpContext.User;

            if (claimUser?.Identity?.IsAuthenticated == true)
            {
                return RedirectToAction("Index", "Home");
            }

            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Login(VMLogin model)
        {
            var result = new ApiResponse();

            try
            {
                result = await _authService.verifyLogin(model);

                if (result.MetaData.Code == 200 && result.Response is User user)
                {
                    var userClaims = new List<Claim>()
                {
                    new Claim("Username", result.Response.Username),
                    new Claim("UserId", result.Response.Id.ToString()),
                    new Claim("Name", result.Response.Name),
                    new Claim("IPAddress", HttpContext.Connection.RemoteIpAddress?.ToString() ?? ""),
                    new Claim("Email", result.Response.Email ?? ""),
                    new Claim("LoginDate", DateTime.Now.ToString("yyyy-MM-dd H:mm:ss"))
                };

                    CookieOptions options = new CookieOptions();
                    // options.Expires = DateTime.Now.AddHours(5);

                    var grandmaIdentity = new ClaimsIdentity(userClaims, "IrigasiMangantiCookiesAuth");
                    var userPrincipal = new ClaimsPrincipal(new[] { grandmaIdentity });
                    await HttpContext.SignInAsync(userPrincipal);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                result.MetaData.Code = 500;
                result.MetaData.Message = "Sorry, something went wrong. Please try again later or contact administrator.";
                result.Response = null;
            }

            return Json(result);
        }


        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            foreach (var cookie in Request.Cookies.Keys)
            {
                Response.Cookies.Delete(cookie);
            }

            await HttpContext.SignOutAsync();
            return RedirectToAction("Login", "Account");
        }

        public IActionResult AccessDenied(){
            return View();
        }
    }
}
