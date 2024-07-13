using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IrigasiManganti.Models;

namespace IrigasiManganti.ViewModels
{
    public class VMAwsDayReading : AwsDayReading
    {
        public string? ReadingDateOnly { get; set; }
    }
}