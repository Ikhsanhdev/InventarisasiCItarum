using IrigasiManganti.Repositories;

namespace IrigasiManganti.Interfaces
{
    public interface IUnitOfWorkRepository
    {
        IGlobalRepository Globals { get; }
        IUserRepository Users { get; }
        IForecastKetersediaanRepository forecastKetersediaan { get; }
        IRecomendationRepository RecomendationRepositories { get; }
        ISchemaRepository Schemas { get; }
        IDebitBendungRepository DebitBendungs { get; }
        IKetersediaanResository KetersediaanRepositories { get; }
        IMasterDataRepository MasterDataRepositories { get; }
        ISumurDataRepository SumurDataRepositories { get; }
    }
}