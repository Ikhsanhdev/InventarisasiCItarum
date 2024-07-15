using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IrigasiManganti.Helpers
{
    public  class ConfigHelper
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory) // Mengatur folder basis untuk mencari appsettings.json
            .AddJsonFile("appsettings.json") // Menambahkan file appsettings.json
            .Build(); // Membangun konfigurasi

       
         public List<string>? GetUsername(){
            var Usernames =  configuration.GetSection("AppSettings:Credentials:Username").Get<List<string>>();
            return Usernames; 
         }

         public string? GetPassword(){
            string Password = configuration.GetSection("AppSettings:Credentials:Password").Value;
            return Password;
         }
    }
}