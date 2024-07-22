using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace IrigasiManganti.ViewModels
{
    public class VMKebutuhan
    {
    
        public dynamic? nama_rentang { get; set; }
        public dynamic? tahun { get; set; } // Akan dikonversi dari string
        public dynamic? bulan { get; set; } // Akan dikonversi dari string
        public dynamic? periode { get; set; } // Akan dikonversi dari string
        public dynamic? kebair { get; set; }
    }
}