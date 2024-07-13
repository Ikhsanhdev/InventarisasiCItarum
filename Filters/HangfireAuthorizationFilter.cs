using Hangfire.Annotations;
using Hangfire.Dashboard;

namespace IrigasiManganti.Filters
{
    public class HangfireAuthorizationFilter : IDashboardAuthorizationFilter
    {
        public bool Authorize([NotNull] DashboardContext context)
        {
            var httpContext = context.GetHttpContext();

            if (httpContext?.User?.Identity?.IsAuthenticated == true)
            {
                var roleClaim = httpContext.User.Claims
                    .Where(a => a.Type.ToLower() == "rolecode")
                    .Select(a => string.IsNullOrEmpty(a.Value) ? null : a.Value)
                    .FirstOrDefault();

                if (roleClaim == "admin_aplikasi")
                {
                    return true;
                }
            }

            return false;
        }

    }
}