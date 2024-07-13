using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IrigasiManganti.ViewModels
{
    public class VMSummaryArrDayReading
    {
        public int total_rain_days { get; set; }
        public double ch_max { get; set; }
        public double average_rain { get; set; }
    }

    public class VMSummaryAwlrArrHourReading{
        public DateTime? Date { get; set; }
        public double? MaxAwlr { get; set; }
        public double? MaxArr { get; set; }
    }
}