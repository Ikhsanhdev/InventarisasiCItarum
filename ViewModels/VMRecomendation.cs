using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IrigasiManganti.Helpers;

namespace IrigasiManganti.ViewModels
{
    public class VMRecomendation
    {
        public Guid id_petak { get; set; }
        public DateOnly tanggal { get; set; }
        public double? debit_aktual { get; set; }
        public double? debit_rekomendasi { get; set; }
        public DateTime updated_at { get; set; } = FormatHelper.ConvertToGmtPlus7FromLocal(DateTime.Now);
    }

    public class VMDebitIrigasi
    {
        public Guid petak_id { get; set; }
        public DateOnly tanggal { get; set; }
        public string? nama_petak { get; set; }
        public string? jenis_bangunan { get; set; }
        public double? luas { get; set; }
        public double? debit_kebutuhan { get; set; }
        public double? debit_aktual { get; set; }
        public double? debit_rekomendasi { get; set; }
        public DateTime? updated_at { get; set; }
    }
}