using IrigasiManganti.Repositories;

namespace IrigasiManganti.Interfaces
{
    public interface IUnitOfWorkRepository
    {
        IGlobalRepository Globals { get; }
        IUserRepository Users { get; }
        IForecastKetersediaanRepository forecastKetersediaan { get; }
        IRecomendationRepository RecomendationRepositories { get; }
    }
}