// Middleware/SubdomainMiddleware.cs

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Npgsql;
using IrigasiManganti.Models;
using Serilog;

namespace IrigasiManganti.Middlewares
{
    public class SubdomainMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;

        public SubdomainMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _configuration = configuration;
        }

        public async Task Invoke(HttpContext context)
        {
            var subDomain = context.Request.Host.Host.Split('.')[0];
            context.Items["SubDomain"] = subDomain;

            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using (IDbConnection db = new NpgsqlConnection(connectionString))
            {
                db.Open();

                var query = @"SELECT * FROM ""Organizations"" WHERE ""SubDomain"" = @SubDomain";
                var result = await db.QueryFirstOrDefaultAsync<Organization>(query, new { SubDomain = subDomain });

                if (result != null)
                {
                    context.Items["CurrOrganization"] = result;
                }

                db.Close();
            }

            await _next(context);
        }
    }
}
