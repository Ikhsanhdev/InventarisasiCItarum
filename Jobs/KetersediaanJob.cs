using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Office2021.Excel.Pivot;
using Hangfire;
using Hangfire.Server;
using IrigasiManganti.Interfaces;
using IrigasiManganti.ViewModels;
using Serilog;

namespace IrigasiManganti.Jobs
{
    public interface IKetersediaanJob
    {
        Task SaveKetersediaanJob(DataTable data, string filePath, PerformContext context);
    }
    public class KetersediaanJob : IKetersediaanJob
    {
        private readonly IUnitOfWorkRepository _repository;
        private readonly IBackgroundJobClient _backgroundJobClient;

        public KetersediaanJob(IUnitOfWorkRepository repository, IBackgroundJobClient backgroundJobClient)
        {
            this._repository = repository;
            this._backgroundJobClient = backgroundJobClient;
        }
        public async Task SaveKetersediaanJob(DataTable table, string filePath, PerformContext context)
        {
            //string jobId = context.BackgroundJob.Id;
            string jobId = "11111";
            try
            {
                // check if data recomendation is empty
                if (table.Rows.Count == 0) return;
                List<VMKetersediaan> modelData = new();
                string strTgl = "";
                foreach (DataRow item in table.Rows)
                {
                    DateTime tanggal = new();
                    double? min = new();
                    double? max = new();
                    double? avg = new();
                    
                    foreach (DataColumn col in table.Columns)
                    {
                        var colName = col.ColumnName;
                        var value = item[col] ?? "";
                        if (colName == "tanggal")
                        {
                            if(value == null) break;
                            if(value.ToString() == "") break;
                            // List<string> formats = new List<string>() { "dd-MMM-yy", "M/d/yyyy", "MM-dd-yyyy", "MM/dd/yyyy, yyyy-MM-dd" };
                            // // Contoh data dari .csv
                            // bool isParsed = false;
                            // DateTime dateTime;
                            // DateTime t = new();
                            // foreach (string format in formats)
                            // {
                            //     value = value ?? string.Empty;
                            //     if (DateTime.TryParseExact(value.ToString(), format, CultureInfo.InvariantCulture, DateTimeStyles.AllowWhiteSpaces, out dateTime))
                            //     {
                            //         isParsed = true;
                            //         t = dateTime;
                            //         break;
                            //     }

                            //     tanggal = t;
                            //     strTgl = t.ToString("yyyy-MM-dd");
                            // }
                            // isParsed = false;
                            // if(!isParsed){
                            //     string dateString = value.ToString();
                            //     string format = "yyyy-MM-dd";
                            //     CultureInfo provider = CultureInfo.InvariantCulture;

                            //     DateTime date = DateTime.ParseExact(dateString, format, provider);
                            //     tanggal = date;
                            //     strTgl = date.ToString("yyyy-MM-dd");
                            // }

                            string dateString = value.ToString();
                            string format = "yyyy-MM-dd";
                            CultureInfo provider = CultureInfo.InvariantCulture;

                            DateTime date = DateTime.ParseExact(dateString, format, provider);
                            tanggal = date;
                            strTgl = date.ToString("yyyy-MM-dd");

                        }
                        else
                        {
                            var column = new List<string>() { "min","max","mean"};
                            if (!column.Contains(colName)) continue;

                            double? dataValue = null;
                            if (value != null && value != "")
                            {
                                if (value.ToString().Contains(","))
                                {
                                    dataValue = double.Parse(value.ToString().Replace(",", "."));
                                }
                                else
                                {
                                    dataValue = double.Parse(value.ToString());
                                }
                            }

                            switch (col.ColumnName)
                            {
                                case "min":
                                case "minimun":
                                case "minimal":
                                    min = dataValue;
                                    break;
                                case "max":
                                case "maximum":
                                case "maximal":
                                    max = dataValue;
                                    break;
                                case "avg":
                                case "mean":
                                case "average":
                                    avg = dataValue;
                                    break;
                                default:
                                    break;
                            }
                        }

                    }

                    modelData.Add(new VMKetersediaan
                    {
                        tanggal = tanggal,
                        ketersediaan_min = min,
                        ketersediaan_max = max,
                        ketersediaan_avg = avg,
                    });

                }
                await _repository.KetersediaanRepositories.SaveKetersediaanDataAsync(modelData, filePath, jobId);
            }
            catch (System.Exception ex)
            {
                Log.Error(ex, "general Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data from api -- API ERROR" });
                throw;
            }
        }
    }
}