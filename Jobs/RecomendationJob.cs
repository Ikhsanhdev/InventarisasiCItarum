using System.Data;
using System.Globalization;
using Hangfire;
using IrigasiManganti.Interfaces;
using IrigasiManganti.ViewModels;
using Serilog;

namespace IrigasiManganti.Jobs
{
    public interface IReRecomendationJob{
        void SaveRecomendationJob(DataTable file, string filePath);
    }
    public class RecomendationJob : IReRecomendationJob
    {
        private readonly IUnitOfWorkRepository _repository;
        private readonly IBackgroundJobClient _backgroundJobClient;
        
        public RecomendationJob(IUnitOfWorkRepository repository, IBackgroundJobClient backgroundJobClient)
        {
            this._repository = repository;
            this._backgroundJobClient = backgroundJobClient;
            
        }
        public void SaveRecomendationJob(DataTable table, string filePath)
        {
            try
            {
                
                // check if data recomendation is empty
                if (table.Rows.Count == 0) return;

                foreach (DataRow row in table.Rows)
                {
                    var modelData = new List<VMRecomendation>();
                    string petakName = "";
                    Guid petak_id = Guid.Empty;
                    int index = 0;
                    foreach (DataColumn column in table.Columns)
                    {
                        if (index == 3)
                        {
                            petakName = row[column].ToString() ?? "";
                            if (!string.IsNullOrEmpty(petakName))
                            {
                                petak_id = _repository.RecomendationRepositories.GetPetakIdByPetakForecastName(petakName) ?? Guid.Empty;
                            }
                        }
                        if (index > 5)
                        {
                            string columnName = column.ColumnName;
                            string format = "dd-MMM-yy";
                            DateTime dateTime = DateTime.ParseExact(columnName, format, CultureInfo.InvariantCulture);
                            DateOnly dateOnly = DateOnly.FromDateTime(dateTime);
                            var valueStr = row[column] ?? null;
                            double? value = null;
                            if (valueStr != null && valueStr != "")
                            {
                                if (valueStr.ToString().Contains(","))
                                {
                                    value = double.Parse(valueStr.ToString().Replace(",", "."));
                                }
                                else
                                {
                                    value = double.Parse(valueStr.ToString());
                                }
                            }

                            modelData.Add(new VMRecomendation
                            {
                                id_petak = petak_id,
                                debit_rekomendasi = value,
                                tanggal = dateOnly,

                            });

                        }

                        index++;
                    }

                    _backgroundJobClient.Enqueue(() => _repository.RecomendationRepositories.SaveRecomendationDataAsync(modelData, filePath, null));
                }
                
            }
            catch (System.Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error in SaveRecomendationJob" });
                throw;
            }
        }
    }
}