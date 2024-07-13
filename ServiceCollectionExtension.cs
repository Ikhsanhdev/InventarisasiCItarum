using IrigasiManganti.Interfaces;
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
            #endregion

            #region ========== [ Register Repositories ] ==========
            services.AddScoped<IGlobalRepository, GlobalRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IForecastKetersediaanRepository, ForecastKetersediaanRepository>();
            #endregion

            #region ========== [ Register Jobs ] ==========
            
            #endregion
        }
    }
}