using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace IrigasiManganti.ViewModels
{
    public class VMPetak
    {
        public Guid id { get; set; }
        public string nama_petak { get; set; } // Akan dikonversi dari string
        public string? jenis_bangunan { get; set; } // Akan dikonversi dari string
        public double luas { get; set; } // Akan dikonversi dari string
        public Guid? bangunan_id { get; set; }
        public Guid? saluran_sekunder_id {get; set;}
        public double kebutuhan {get; set;}
        public string lokasi {get; set;}
        public DateOnly tanggal {get; set;}
        public DateTime? updated_at {get; set;}
    }
}