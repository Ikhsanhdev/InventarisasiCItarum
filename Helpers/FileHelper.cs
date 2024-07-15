using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IrigasiManganti.Helpers
{
    public static  class FileHelper
    {
        public static void EnsureDirectoryExists(string path)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
        }

        public static string SaveFile(IFormFile file, string uploadDirectory)
        {
            EnsureDirectoryExists(uploadDirectory);

            var fileName = $"{Guid.NewGuid().ToString()}_{DateTime.Now.ToString("dd_MMM_yyyy")}_{file.FileName}"; ;
            var filePath = Path.Combine(uploadDirectory, fileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(fileStream);
            }
            return filePath;
        }
    }
}