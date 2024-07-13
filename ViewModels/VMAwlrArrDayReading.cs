using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IrigasiManganti.Models;

namespace IrigasiManganti.ViewModels
{
    public class VMAwlrArrDayReading : AwlrArrDayReading
    {
        public string? ReadingDateOnly { get; set; }
    }

    public class VMAwlrArrHourReading : AwlrArrHourReading
    {
        public DateTime reading_hour { get; set; }
        public double? water_level { get; set; }
        public string? hour { get; set; }
        public string? date { get; set; }
    }
}