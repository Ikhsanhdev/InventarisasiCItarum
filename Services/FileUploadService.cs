
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IrigasiManganti.Services
{
    public interface IFileUploadService {
        Task<string> SaveFileAsync(IFormFile file, string uploadDirectory);
    }
    public  class FileUploadService : IFileUploadService
    {
        public async Task<string> SaveFileAsync(IFormFile file, string uploadDirectory)
        {
            EnsureDirectoryExists(uploadDirectory);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            fileName = $"{DateTime.Now.ToString("dd/MMM/YYYY")}_{fileName}"; ;
            var filePath = Path.Combine(uploadDirectory, fileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return filePath;
        }


        private void EnsureDirectoryExists(string directory)
        {
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
        }
    }
}