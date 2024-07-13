using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IrigasiManganti.ViewModels
{
    public class VMGrafik
    {
        public double? value { get; set; }
        public long? millis { get; set; }
        public string? description { get; set; }
    }

    public class VMGrafikAwlrArr
    {
        public double? awlr { get; set; }
        public double? arr { get; set; }
        public long? millis { get; set; }
        public string? description { get; set; }
    }
}