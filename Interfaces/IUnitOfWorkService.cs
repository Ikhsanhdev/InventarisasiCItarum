using IrigasiManganti.Services;

namespace IrigasiManganti.Interfaces
{
    public interface IUnitOfWorkService
    {
        IAuthService Auths { get; }
        ICsvService Csvs { get; }
        IKebutuhanService Kebutuhan { get; }
    }
}