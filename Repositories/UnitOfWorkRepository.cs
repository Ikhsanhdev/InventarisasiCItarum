using IrigasiManganti.Interfaces;

namespace IrigasiManganti.Repositories
{
    public class UnitOfWorkRepository : IUnitOfWorkRepository
    {
        public UnitOfWorkRepository(
            IGlobalRepository globalRepository,
            IUserRepository userRepository,
            IForecastKetersediaanRepository ForecastKetersediaanRepository,
            ISchemaRepository schemaRepository
        )
        {
            Globals = globalRepository;
            Users = userRepository;
            forecastKetersediaan = ForecastKetersediaanRepository;
            Schemas = schemaRepository;
        }

        public IGlobalRepository Globals { get; }
        public IUserRepository Users { get; }
        public IForecastKetersediaanRepository forecastKetersediaan {get;}
        public ISchemaRepository Schemas {get;}
    }
}