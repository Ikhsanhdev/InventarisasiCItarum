using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IrigasiManganti.ViewModels
{
    public class VMDateRange
    {
        public string location { get; set; } = "sidareja";
        public DateOnly? start { get; set; }
        public DateOnly? end { get; set; }

    }

}