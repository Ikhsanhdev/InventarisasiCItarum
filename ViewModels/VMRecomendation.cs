using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IrigasiManganti.ViewModels
{
    public class VMRecomendation
    {
        public Guid id_petak { get; set; }
        public DateOnly tanggal { get; set; }
        public double? debit_aktual { get; set; }
        public double? debit_rekomendasi { get; set; }
        public DateTime updated_at { get; set; } = DateTime.Now;
    }
}