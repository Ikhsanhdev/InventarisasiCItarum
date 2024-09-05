using System.Data;
using System.Globalization;
using System.Text;
using ClosedXML.Excel;
using CsvHelper;
using CsvHelper.Configuration;
using IrigasiManganti.Models;

namespace IrigasiManganti.Services
{
    public interface ICsvService
    {
        DataTable ReadCsvToDataTable(IFormFile file, string delimiter = ";");
        Task<IXLWorkbook> GenerateAllDebitPengambilan(IEnumerable<DebitPengambilan> data);
        Task<IXLWorkbook> GenerateAllDebitHulu(IEnumerable<DebitHulu> data);
    }
    public class CsvService : ICsvService
    {
        public DataTable ReadCsvToDataTable(IFormFile file, string delimiter = ";")
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

        private string generateColumnName(string columnName)
        {
            if (string.IsNullOrEmpty(columnName)) return "";
            string result = "";
            List<string> columnKetersediaan = new List<string>() { "min", "max", "avg", "mean", "average", "minimal", "maximal", "minimum", "maksimun", "rerata", "rata-rata", "tanggal", "date" };

            int index = columnKetersediaan.IndexOf(columnName.ToLower());
            if (index == -1) return columnName.ToLower();

            result = columnKetersediaan[index];

            return result;
        }

        public Task<IXLWorkbook> GenerateAllDebitPengambilan(IEnumerable<DebitPengambilan> data) {
            try {
                IXLWorkbook workbook = new XLWorkbook();
                var worksheet = workbook.Worksheets.Add("DebitPengambilan");

                worksheet.Cell(1, 1).Value = "Tanggal";         // Column A: Date
                worksheet.Cell(1, 2).Value = "Nilai";       // Column B: Amount
                worksheet.Cell(1, 3).Value = "Satuan";
                worksheet.Cell(1, 4).Value = "UpdatedAt";

                var headerRange = worksheet.Range("A1:D1");
                headerRange.Style.Font.Bold = true;

                int row = 2;  // Start at the first row
                foreach (var item in data)
                {
                    // Populate your worksheet with the data from each `DebitPengambilan` object
                    worksheet.Cell(row, 1).Value = item.Tanggal;  // Example: replace Property1 with your actual property names
                    worksheet.Cell(row, 2).Value = item.Nilai;
                    worksheet.Cell(row, 3).Value = item.Satuan;
                    worksheet.Cell(row, 4).Value = item.Update;
                    row++;
                }

                return Task.FromResult(workbook);
            } catch(Exception ex) {
                throw;
            }
        }

        public Task<IXLWorkbook> GenerateAllDebitHulu(IEnumerable<DebitHulu> data) {
            try {
                IXLWorkbook workbook = new XLWorkbook();
                var worksheet = workbook.Worksheets.Add("DebitHulu");

                worksheet.Cell(1, 1).Value = "Tanggal";         // Column A: Date
                worksheet.Cell(1, 2).Value = "Nilai";       // Column B: Amount
                worksheet.Cell(1, 3).Value = "Satuan";
                worksheet.Cell(1, 4).Value = "UpdatedAt";

                var headerRange = worksheet.Range("A1:D1");
                headerRange.Style.Font.Bold = true;

                int row = 2;  // Start at the first row
                foreach (var item in data)
                {
                    // Populate your worksheet with the data from each `DebitPengambilan` object
                    worksheet.Cell(row, 1).Value = item.Tanggal;  // Example: replace Property1 with your actual property names
                    worksheet.Cell(row, 2).Value = item.Nilai;
                    worksheet.Cell(row, 3).Value = item.Satuan;
                    worksheet.Cell(row, 4).Value = item.Update;
                    row++;
                }

                return Task.FromResult(workbook);
            } catch(Exception ex) {
                throw;
            }
        }
    }
}