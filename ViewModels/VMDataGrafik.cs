using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IrigasiManganti.ViewModels
{
    public class VMDataGrafik
    {
        public DataSiaga? DataSiaga { get; set; }
        public List<DataGrafik>? DataGrafik { get; set; }
        public List<DataGrafikArr>? DataGrafikArr { get; set; }
        public List<DataGrafikDebit>? DataGrafikDebit { get; set; }
        public List<DataGrafikBattery>? DataGrafikBattery { get; set; }
        public DataTma DataTma { get; set; }
        public double? defaultElevation { get; set; }
        public bool? IsElevasiExist { get; set; }
    }

    public class DataGrafik
    {
        public string date { get; set; }
        public double? value { get; set; }
        public double? elevasi { get; set; }
        public double? debit { get; set; }
        public double? battery { get; set; }
        public long millis { get; set; }
    }

    public class DataGrafikDebit
    {
        public double? value { get; set; }
        public long millis { get; set; }
    }

    public class DataGrafikArr
    {
        public double? value { get; set; }
        public long millis { get; set; }
    }

    public class DataGrafikBattery
    {
        public double? value { get; set; }
        public long millis { get; set; }
    }

    public class DataTma
    {
        public double? TmaMin { get; set; }
        public double? TmaMax { get; set; }
    }

    public class DataSiaga
    {
        public double? Siaga1 { get; set; }
        public double? Siaga2 { get; set; }
        public double? Siaga3 { get; set; }
    }

    public class DataElevasi
    {
        public double Elevasi { get; set; }
    }
}