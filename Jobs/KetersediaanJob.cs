using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Hangfire;
using IrigasiManganti.Interfaces;
using IrigasiManganti.ViewModels;

namespace IrigasiManganti.Jobs
{
    public interface IKetersediaanJob
    {
        void SaveKetersediaanJob(DataTable data, string filePath);
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
        public void SaveKetersediaanJob(DataTable table, string filePath)
        {
            try
            {
                // check if data recomendation is empty
                if (table.Rows.Count == 0) return;
                List<VMKetersediaan> modelData = new();
                foreach (DataRow item in table.Rows)
                {
                    DateTime tanggal = new();
                    double? min = new();
                    double? max = new();
                    double? avg = new();

                    foreach (DataColumn col in table.Columns)
                    {
                        var value = item[col] ?? "";
                        if (col.ColumnName == "tanggal")
                        {
                            List<string> formats = new List<string>() { "dd-MMM-yy", "M/d/yyyy", "MM-dd-yyyy", "MM/dd/yyyy" };
                            // Contoh data dari .csv
                            bool isParsed = false;
                            DateTime dateTime;
                            DateTime t = new();
                            foreach (string format in formats)
                            {
                                value = value ?? string.Empty;
                                if (DateTime.TryParseExact(value.ToString(), format, CultureInfo.InvariantCulture, DateTimeStyles.AllowWhiteSpaces, out dateTime))
                                {
                                    isParsed = true;
                                    t = dateTime;
                                    break;
                                }
                            }

                        }
                        else
                        {
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

                        modelData.Add(new VMKetersediaan
                        {
                            tanggal = tanggal,
                            ketersediaan_min = min,
                            ketersediaan_max = max,
                            ketersediaan_avg = avg,
                        });
                    }

                    _backgroundJobClient.Enqueue(() => _repository.KetersediaanRepositories.SaveKetersediaanDataAsync(modelData, filePath, null));
                }
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}