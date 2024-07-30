using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Office2010.Excel;
using IrigasiManganti.Helpers;
using IrigasiManganti.ViewModels;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;

namespace IrigasiManganti.Services
{
    public interface IKebutuhanService{
        Task<List<VMKebutuhanSmopi>> GetKebutuhanSmopiAsync();
        Task<List<VMKebutuhan>> GetDataFromApiSmopi();
    }
    public class KebutuhanService : IKebutuhanService
    {
        private static readonly HttpClient client = new HttpClient();

        public async Task<List<VMKebutuhanSmopi>> GetKebutuhanSmopiAsync()
        {
            try
            {
                List<VMKebutuhanSmopi> result = new();
                var dataApiSmopi = await GetDataFromApiSmopi();
                if (dataApiSmopi == null) return result;

                dataApiSmopi = dataApiSmopi.OrderBy(x => x.tahun).ThenBy(x => x.bulan).ThenBy(x => x.periode).ToList();
                foreach (var row in dataApiSmopi)
                {
                    string bulan = $"{row.tahun}-{row.bulan}";
                    int periode = int.Parse(row.periode);
                    double? value = row.kebair == null ? null : Math.Round(double.Parse(row.kebair), 1);
                    var temp = GenerateDataPerPeriode(bulan, periode, value);
                    if(temp != null){
                        result.AddRange(temp);
                    }
                    
                }

                return result;
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        private List<VMKebutuhanSmopi> GenerateDataPerPeriode(string bulan, int periode, double? value)
        {
            List<VMKebutuhanSmopi> result = new();
            if (periode < 1) return result;

            int TotalDays = FormatHelper.TotalDays(bulan);

            int startDate = periode == 1 ? 1 : 16;
            int endDate = periode == 1 ? 15 : TotalDays;

            for (int i = startDate; startDate <= endDate; i++)
            {
                if( i > endDate) break;
                string tgl = i < 10 ? $"{bulan}-0{i}" : $"{bulan}-{i}";
                DateTime tanggal = Convert.ToDateTime(tgl);
                result.Add(new VMKebutuhanSmopi
                {
                    tanggal = tanggal,
                    kebutuhan = value
                });
            }

            return result;
        }
        public async Task<List<VMKebutuhan>> GetDataFromApiSmopi(){
            try
            {
                HttpResponseMessage response = await client.GetAsync("http://smopi.info/index.php?r=Api/kebAir");
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();
                List<VMKebutuhan> vmKebutuhanList = JsonConvert.DeserializeObject<List<VMKebutuhan>>(responseBody);

                return vmKebutuhanList;
            }
            catch (System.Exception)
            {
                throw;
            }
            
        }
        
    }


}