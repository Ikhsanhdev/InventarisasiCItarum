using Microsoft.EntityFrameworkCore;

using Hangfire;
using Hangfire.PostgreSql;
using Dapper;
using Serilog;
using IrigasiManganti.Data;
using DinkToPdf.Contracts;
using DinkToPdf;

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
            // Log.Logger = new LoggerConfiguration()
            //     .WriteTo.File("ErrorLog/Error.log", rollingInterval: RollingInterval.Month)
            //     .CreateLogger();

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
