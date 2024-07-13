namespace IrigasiManganti.Middlewares
{
    public class ClientIdMiddleware
    {
        private readonly RequestDelegate _next;

        public ClientIdMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            // Extract the device ID from the query string or wherever it is in your request
            var deviceId = context.Request.Query["id"];

            // Set the client ID header for the request
            context.Request.Headers.Add("X-ClientId", deviceId);

            // Call the next middleware in the pipeline
            await _next(context);
        }
    }
}