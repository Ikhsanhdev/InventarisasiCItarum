using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IrigasiManganti.Models;

namespace IrigasiManganti.ViewModels
{
    public class VMAwsHourReading : AwsHourReading
    {
        public string? hour { get; set; }
        public string? date { get; set; }
    }

    public class VMAwsHourStatusReading {
        public DateTime? date { get; set; }
        public double? max_value { get; set; }
        public double? min_value { get; set; }
        public string? status_max { get; set; }
        public string? status_min { get; set; }
    }

    public class VMAwsHourSummary { 
        public DateTime? date { get; set; }
        public double? max_value { get; set; }
    }
}