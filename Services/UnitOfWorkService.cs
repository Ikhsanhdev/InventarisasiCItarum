using IrigasiManganti.Interfaces;

namespace IrigasiManganti.Services
{
    public class UnitOfWorkService : IUnitOfWorkService
    {
        public UnitOfWorkService(
            IAuthService authService,
            ICsvService csvService,
            IFileUploadService fileUploadService
        )
        {
            Auths = authService;
            Csvs = csvService;
            FileUploads = fileUploadService;
        }

        public IAuthService Auths { get; }
        public ICsvService Csvs { get; }
        public IFileUploadService FileUploads { get; }
    }
}