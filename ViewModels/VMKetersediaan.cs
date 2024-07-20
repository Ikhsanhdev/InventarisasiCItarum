using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IrigasiManganti.Helpers;

namespace IrigasiManganti.ViewModels
{
    public class VMKetersediaan
    {
        public Guid id { get; set; } = Guid.NewGuid();
        public DateTime tanggal { get; set; }
        public double? ketersediaan_min { get; set; }
        public double? ketersediaan_max { get; set; }
        public double? ketersediaan_avg { get; set; }
        public double? kebutuhan { get; set; }
        public DateTime? updated_at { get; set; } = FormatHelper.ConvertToGmtPlus7FromLocal(DateTime.Now);
        public string? satuan { get; set; } = "m3/s";
    }

    public class VMDebitBendung : VMKetersediaan{
        public Guid id { get; set; }
        
    }
}