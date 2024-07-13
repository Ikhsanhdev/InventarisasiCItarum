using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IrigasiManganti.ViewModels
{
    public class VMMinMaxReport
    {
        public string? date { get; set; }
        public string? Date { get; set; }
        public double? value_max { get; set; }
        public double? value_min { get; set; }
    }
}