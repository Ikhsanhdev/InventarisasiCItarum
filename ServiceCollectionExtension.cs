using IrigasiManganti.Interfaces;
using IrigasiManganti.Jobs;
using IrigasiManganti.Repositories;
using IrigasiManganti.Services;

namespace IrigasiManganti
{
    public static class ServiceCollectionExtension
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            #region ========== [ Register Unit Of Works ] ==========
            services.AddScoped<IUnitOfWorkService, UnitOfWorkService>();
            services.AddScoped<IUnitOfWorkRepository, UnitOfWorkRepository>();
            #endregion

            #region ========== [ Register Services ] ==========
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ICsvService, CsvService>();
            #endregion

            #region ========== [ Register Repositories ] ==========
            services.AddScoped<IGlobalRepository, GlobalRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IForecastKetersediaanRepository, ForecastKetersediaanRepository>();
            services.AddScoped<IRecomendationRepository, RecomendationRepository>();
            services.AddScoped<IKetersediaanResository, KetersediaanRepository>();
            services.AddScoped<ISchemaRepository, SchemaRepository>();
            #endregion

            #region ========== [ Register Jobs ] ==========
            services.AddScoped<IReRecomendationJob, RecomendationJob>();
            services.AddScoped<IKetersediaanJob, KetersediaanJob>();
            #endregion
        }
    }
}