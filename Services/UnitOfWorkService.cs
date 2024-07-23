using IrigasiManganti.Interfaces;

namespace IrigasiManganti.Services
{
    public class UnitOfWorkService : IUnitOfWorkService
    {
        public UnitOfWorkService(
            IAuthService authService,
            ICsvService csvService,
            IKebutuhanService kebutuhanService
           
        )
        {
            Auths = authService;
            Csvs = csvService;
            Kebutuhan = kebutuhanService;


        }

        public IAuthService Auths { get; }
        public ICsvService Csvs { get; }
        public IKebutuhanService Kebutuhan { get; }
        
    }
}