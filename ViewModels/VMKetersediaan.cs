using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IrigasiManganti.ViewModels
{
    public class VMKetersediaan
    {
        public DateTime tanggal { get; set; }
        public double? ketersediaan_min { get; set; }
        public double? ketersediaan_max { get; set; }
        public double? ketersediaan_avg { get; set; }
        public double? kebutuhan { get; set; }
        public string? satuan { get; set; } = "m3/s";
    }

    public class VMDebitBendung : VMKetersediaan{
        public Guid id { get; set; }
        
    }
}