using IrigasiManganti.Interfaces;

namespace IrigasiManganti.Repositories
{
    public class UnitOfWorkRepository : IUnitOfWorkRepository
    {
        public UnitOfWorkRepository(
            IGlobalRepository globalRepository,
            IUserRepository userRepository,
            IForecastKetersediaanRepository ForecastKetersediaanRepository,
            ISchemaRepository schemaRepository,
            IDebitBendungRepository debitBendungRepository
        )
        {
            Globals = globalRepository;
            Users = userRepository;
            forecastKetersediaan = ForecastKetersediaanRepository;
            Schemas = schemaRepository;
            DebitBendungs = debitBendungRepository;
        }

        public IGlobalRepository Globals { get; }
        public IUserRepository Users { get; }
        public IForecastKetersediaanRepository forecastKetersediaan {get;}
        public ISchemaRepository Schemas {get;}
        public IDebitBendungRepository DebitBendungs {get;}
    }
}