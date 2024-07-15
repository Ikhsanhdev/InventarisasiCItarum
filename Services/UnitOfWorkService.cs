using IrigasiManganti.Interfaces;

namespace IrigasiManganti.Services
{
    public class UnitOfWorkService : IUnitOfWorkService
    {
        public UnitOfWorkService(
            IAuthService authService,
            ICsvService csvService
           
        )
        {
            Auths = authService;
            Csvs = csvService;
           
        }

        public IAuthService Auths { get; }
        public ICsvService Csvs { get; }
        
    }
}