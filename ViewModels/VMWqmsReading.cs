using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IrigasiManganti.Models;

namespace IrigasiManganti.ViewModels
{
    public class VMWqmsHourReading : WqmsHourReading
    {
        public string? hour { get; set; }
        public string? date { get; set; }
    }
    public class VMWqmsDayReading : WqmsDayReading
    {
        public string? ReadingDateOnly { get; set; }
    }
}