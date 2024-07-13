using System.Collections.Generic;
using AspNetCoreRateLimit;

namespace IrigasiManganti.Middlewares
{
    public interface IRateLimitKeyGenerator
    {
        string ComputeKey(HttpContext httpContext, RateLimitRule rule);
    }

    public class DeviceIdRateLimitKeyGenerator : IRateLimitKeyGenerator
    {
        public virtual string ComputeKey(HttpContext httpContext, RateLimitRule rule)
        {
            // You can customize this logic based on your requirements
            var deviceId = httpContext.Request.Headers["X-DeviceId"].ToString();
            return $"{rule.Period}:{deviceId}";
        }
    }
}