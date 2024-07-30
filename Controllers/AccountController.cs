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

        [HttpGet]
        public IActionResult Login()
        {
            ClaimsPrincipal claimUser = HttpContext.User;

            if (claimUser?.Identity?.IsAuthenticated == true)
            {
                return Redirect("/");
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
                        // new Claim("Username", result.Response.Username),
                        // new Claim("UserId", result.Response.Id.ToString()),
                        // new Claim("Name", result.Response.Name),
                        // new Claim("IPAddress", HttpContext.Connection.RemoteIpAddress?.ToString() ?? ""),
                        // new Claim("Email", result.Response.Email ?? ""),
                        // new Claim("LoginDate", DateTime.Now.ToString("yyyy-MM-dd H:mm:ss"))
                        new Claim(ClaimTypes.Name, user.Username),
                        new Claim("UserId", user.Id.ToString()),
                        new Claim("Name", user.Name),
                        new Claim("IPAddress", HttpContext.Connection.RemoteIpAddress?.ToString() ?? ""),
                        new Claim(ClaimTypes.Email, user.Email ?? ""),
                        new Claim("LoginDate", DateTime.Now.ToString("yyyy-MM-dd H:mm:ss"))
                    };

                    // CookieOptions options = new CookieOptions();
                    // options.Expires = DateTime.Now.AddHours(5);

                    // var grandmaIdentity = new ClaimsIdentity(userClaims, "IrigasiMangantiCookiesAuth");
                    var grandmaIdentity = new ClaimsIdentity(userClaims, CookieAuthenticationDefaults.AuthenticationScheme);
                    var userPrincipal = new ClaimsPrincipal(new[] { grandmaIdentity });
                    Console.WriteLine("after use pricipal");
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, userPrincipal);  
                    Console.WriteLine("after await");
                }
            }  catch (InvalidOperationException invOpEx)
            {
                Console.WriteLine("InvalidOperationException: " + invOpEx.Message);
                Log.Error(invOpEx, "Invalid Operation Exception: {@ExceptionDetails}", new { invOpEx.Message, invOpEx.StackTrace });
                result.MetaData.Code = 500;
                result.MetaData.Message = "Sorry, something went wrong. Please try again later or contact administrator.";
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

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Account");
        }

        public IActionResult AccessDenied(){
            return View();
        }
    }
}
