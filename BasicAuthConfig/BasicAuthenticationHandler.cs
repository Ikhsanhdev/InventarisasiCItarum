using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using IrigasiManganti.Helpers;

namespace IrigasiManganti.BasicAuthService
{
    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly ConfigHelper _configHelper = new ConfigHelper();
        public BasicAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock)
        : base(options, logger, encoder, clock)
        {
        }
        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
                return AuthenticateResult.Fail("Missing Authorization Header");

            try
            {
                var authenticationHeaderValue = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);

                // Decode the basic authentication string
                var decodedAuthenticationString = Encoding.UTF8.GetString(Convert.FromBase64String(authenticationHeaderValue.Parameter));
                var usernamePasswordArray = decodedAuthenticationString.Split(':');
                var username = usernamePasswordArray[0];
                var password = usernamePasswordArray[1];

                // Implement your own logic to validate username and password
                if (!IsUserValid(username, password))
                    return AuthenticateResult.Fail("Invalid Username or Password");

                var claims = new[] { new Claim(ClaimTypes.Name, username) };
                var identity = new ClaimsIdentity(claims, Scheme.Name);
                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, Scheme.Name);

                return AuthenticateResult.Success(ticket);
            }
            catch
            {
                return AuthenticateResult.Fail("Invalid Authorization Header");
            }
        }

        private bool IsUserValid(string username, string password)
        {
            var Usernames = new List<string>(){ "admin_citanduy", "admin", "admin_hgt" };
            
            string correct_password = "12345678";
            // Replace this with your own logic to validate username and password
            return Usernames.Contains(username) && password == correct_password;
        }
    }
}