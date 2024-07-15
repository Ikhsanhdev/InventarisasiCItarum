using IrigasiManganti.Repositories;

namespace IrigasiManganti.Interfaces
{
    public interface IUnitOfWorkRepository
    {
        IGlobalRepository Globals { get; }
        IUserRepository Users { get; }
        IForecastKetersediaanRepository forecastKetersediaan { get; }
        ISchemaRepository Schemas { get; }
        IDebitBendungRepository DebitBendungs { get; }
    }
}