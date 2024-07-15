using Microsoft.EntityFrameworkCore;

using Hangfire;
using Hangfire.PostgreSql;
using Dapper;
using Serilog;
using IrigasiManganti.Data;
using DinkToPdf.Contracts;
using DinkToPdf;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using IrigasiManganti.BasicAuthService;
using Microsoft.AspNetCore.Authentication;

namespace IrigasiManganti
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));

            builder.Services.AddControllersWithViews().AddNewtonsoftJson(opt =>
            {
                opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            // Injecting Services Dependency.
            builder.Services.RegisterServices();

            builder.Services.AddAuthorization();
            builder.Services.AddAuthentication("CookieAuthentication")
            .AddCookie("CookieAuthentication", options =>
            {
                options.Cookie.Name = "IrigasiMangantiCookiesAuth";
                options.LoginPath = "/Account/Login";
                options.AccessDeniedPath = "/Account/AccessDenied";
                options.ExpireTimeSpan = TimeSpan.FromHours(6);
            });

            builder.Services.AddHttpContextAccessor();

            builder.Services.AddRazorPages();

            builder.Services.AddEndpointsApiExplorer();

            string? connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

            #region Logging
            Log.Logger = new LoggerConfiguration()
                .WriteTo.File("ErrorLog/Error.log", rollingInterval: RollingInterval.Month)
                .CreateLogger();

            #endregion Logging

            builder.Services.AddDbContext<IrigasiMangantiContext>((provider, options) =>
            {
                if (connectionString != null)
                {
                    options.UseNpgsql(connectionString)
                        .UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole()))
                        .EnableSensitiveDataLogging();
                }
                else
                {
                    Log.Error("Connection string is null.");
                    options.UseNpgsql("DefaultConnection")
                        .UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole()))
                        .EnableSensitiveDataLogging();
                }
            });

            SqlMapper.AddTypeHandler(new DateOnlyHandler());

            builder.Services.AddHangfire(config =>
            config.UsePostgreSqlStorage(connectionString));


            builder.Services.AddHangfireServer(options =>
            {
                options.ServerTimeout = TimeSpan.FromMinutes(7);
            });

            #region  Region Swagger
            // Register the Swagger generator
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API Irigasi Citanduy", Version = "v1" });

                // Include only controllers in the 'Controllers.Api' namespace
                c.DocInclusionPredicate((docName, apiDesc) =>
                {
                    if (!apiDesc.TryGetMethodInfo(out var methodInfo)) return false;
                    var controllerNamespace = methodInfo.DeclaringType.Namespace;
                    return controllerNamespace != null && controllerNamespace.StartsWith("IrigasiManganti.Controllers.Api");
                });
                // Add Basic Authentication
                var securityScheme = new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "basic",
                    In = ParameterLocation.Header,
                    Description = "Basic Authorization header using the Bearer scheme."
                };
                c.AddSecurityDefinition("Basic", securityScheme);

                // Add Operation Filters to add Authorization header
                c.OperationFilter<SwaggerBasicAuthFilter>();
            });

            builder.Services.AddAuthentication("BasicAuthentication")
                            .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);
            #endregion

            builder.Services.AddHttpContextAccessor();

            builder.Services.AddRazorPages();

            builder.Services.AddSignalR();

            var app = builder.Build();

            app.UseHangfireDashboard("/hangfire", new DashboardOptions
            {
                // Authorization = new[] { new HangfireAuthorizationFilter() }
            });

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            app.UseSwagger();
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Irigasi Citanduy");
            });

            // app.UseMiddleware<Middlewares.SubdomainMiddleware>();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Prediksi}/{id?}");

            app.MapRazorPages();

            app.Run();
        }
    }
}
