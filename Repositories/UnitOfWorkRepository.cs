using IrigasiManganti.Interfaces;

namespace IrigasiManganti.Repositories
{
    public class UnitOfWorkRepository : IUnitOfWorkRepository
    {
        public UnitOfWorkRepository(
            IGlobalRepository globalRepository,
            IUserRepository userRepository,
            IForecastKetersediaanRepository ForecastKetersediaanRepository,
            IRecomendationRepository recomendationRepository,
            ISchemaRepository schemaRepository,
            IKetersediaanResository ketersediaanResository,
            IDebitBendungRepository debitBendungRepository,
            IMasterDataRepository masterDataRepository,
            ISumurDataRepository sumurDataRepository
        )
        {
            Globals = globalRepository;
            Users = userRepository;
            forecastKetersediaan = ForecastKetersediaanRepository;
            RecomendationRepositories = recomendationRepository;
            Schemas = schemaRepository;
            KetersediaanRepositories = ketersediaanResository;
            DebitBendungs = debitBendungRepository;
            MasterDataRepositories = masterDataRepository;
            SumurDataRepositories = sumurDataRepository;
        }

        public IGlobalRepository Globals { get; }
        public IUserRepository Users { get; }
        public IForecastKetersediaanRepository forecastKetersediaan {get;}
        public IRecomendationRepository RecomendationRepositories { get;}
        public IKetersediaanResository KetersediaanRepositories { get;}
        public ISchemaRepository Schemas {get;}
        public IDebitBendungRepository DebitBendungs {get;}
        public IMasterDataRepository MasterDataRepositories { get;}
        public ISumurDataRepository SumurDataRepositories { get; }

    }
}