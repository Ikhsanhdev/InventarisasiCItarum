using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IrigasiManganti.ViewModels
{
    public class VMGrafikPerDAS
    {
        public string name { get; set; }
        public string type { get; set; } = "line";
        public List<DataPerDAS> data { get; set; } = [];
    }

    public class DataPerDAS
    {
        public long? millis { get; set; }
        public double? value { get; set; }
    }

    public class DapperDataPerDAS
    {
        public string StationName { get; set; }
        public DateTime? ReadingAt { get; set; }
        public Double? Value { get; set; }
    }
}