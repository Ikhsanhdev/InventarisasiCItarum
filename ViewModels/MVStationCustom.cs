using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IrigasiManganti.Models;

namespace IrigasiManganti.ViewModels
{
    public class MVStationCustom : MvStation
    {
        public string? Stationtype { get; set; }
        public string? OrganizationName { get; set; }
    }
}