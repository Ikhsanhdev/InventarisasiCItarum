using System.Data;
using System.Globalization;
using System.Text;
using CsvHelper;
using CsvHelper.Configuration;

namespace IrigasiManganti.Services
{
    public interface ICsvService
    {
        DataTable ReadCsvToDataTable(IFormFile file);
    }
    public class CsvService : ICsvService
    {
        public DataTable ReadCsvToDataTable(IFormFile file)
        {
            try
            {
                using (var reader = new StreamReader(file.OpenReadStream()))
                using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture) { Delimiter = ";", Encoding = Encoding.UTF8 }))
                {
                    
                    var records = csv.GetRecords<dynamic>().ToList();
                    if (records.Any())
                    {
                        var dataTable = new DataTable();

                        // Assume the first record is the header
                        var firstRecord = records.First() as IDictionary<string, object>;
                        foreach (var kvp in firstRecord)
                        {
                            dataTable.Columns.Add(generateColumnName(kvp.Key));
                        }

                        // Add rows to DataTable
                        foreach (var record in records)
                        {
                            var dataRow = dataTable.NewRow();
                            var recordDict = record as IDictionary<string, object>;
                            foreach (var kvp in recordDict)
                            {
                                dataRow[kvp.Key] = kvp.Value;
                            }
                            dataTable.Rows.Add(dataRow);
                        }

                        return dataTable;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private string generateColumnName(string columnName){
            if (string.IsNullOrEmpty(columnName)) return "";
            string result = "";
            List<string> columnKetersediaan = new List<string>(){"min","max","avg","mean","average","minimal","maximal","minimum","maksimun","rerata","rata-rata","tanggal","date"};

            int index = columnKetersediaan.IndexOf(columnName.ToLower());
            if (index == -1) return columnName.ToLower();

            result = columnKetersediaan[index];

            return result;
        }
    }
}