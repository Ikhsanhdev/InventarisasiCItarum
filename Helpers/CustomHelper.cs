using System.Globalization;
using System.Text;
using DocumentFormat.OpenXml.Office2016.Excel;
using IrigasiManganti.Models;
using IrigasiManganti.ViewModels;

namespace IrigasiManganti.Helpers;
public static class CustomHelper
{
    private static readonly IndonesianDateTimeService indonesianDateTimeService = new();
    public static string WaterQualityCategory(float? value)
    {
        if (value == null || value < 0) return "Not Recognize";
        switch (value)
        {
            case float n when (n >= 0 && n <= 1):
                return "Memenuhi BMA";
            case float n when (n > 1 && n <= 5):
                return "Cemar Ringan";
            case float n when (n > 5 && n <= 10):
                return "Cemar Sedang";
            default:
                return "Cemar Berat";
        }
    }

    public static List<int> ExtractYearMonth(string month)
    {
        var result = new List<int>();
        foreach (var item in month.Split("-"))
        {
            result.Add(Convert.ToInt32(item));
        }
        return result;
    }


    public static Dictionary<string, dynamic> GenerateDictionary(List<string> items, List<string>? parent = null, dynamic? value = null)
    {
        var result = new Dictionary<string, dynamic>();
        if (parent == null)
        {
            foreach (var item in items)
            {
                result.Add(item, "-");
            }
            return result;
        }

        foreach (var item in parent)
        {
            if (value is int intValue)
                // {
                //     if (value < 10) value = $"0{value}";
                // }
                result.Add(item, value);
            var childs = new Dictionary<string, dynamic>();
            foreach (var child in items)
            {
                childs.Add(child, "-");
            }
            result.Add("data", childs);
        }

        return result;
    }

    public static int TotalDaysInMonth(string periode)
    {
        var YearMonth = ExtractYearMonth(periode);
        return DateTime.DaysInMonth(YearMonth[0], YearMonth[1]);
    }

    public static string ExcelColumnAdress(int col)
    {
        if (col <= 26)
        {
            return Convert.ToChar(col + 64).ToString();
        }
        int div = col / 26;
        int mod = col % 26;
        if (mod == 0) { mod = 26; div--; }
        return ExcelColumnAdress(div) + ExcelColumnAdress(mod);
    }

    public static long ConvertDatetimeToMillis(DateTime date)
    {
        long millis = (long)(date - new DateTime(1970, 1, 1)).TotalMilliseconds;
        return millis;
    }

    public static string RemoveIsAndConvertToCamelCase(string input)
    {
        // Remove "Is" from the input string
        input = input.Replace("Is", "");

        // Convert the string to camel case
        if (string.IsNullOrEmpty(input))
            return input;

        char[] charArray = input.ToCharArray();
        charArray[0] = char.ToLower(charArray[0]);
        return new string(charArray);
    }

    public static string InsertSpaceBeforeUppercase(string str)
    {
        if (string.IsNullOrEmpty(str))
            return str;

        StringBuilder sb = new StringBuilder();
        foreach (char c in str)
        {
            if (char.IsUpper(c))
            {
                // Insert space before uppercase letter
                sb.Append(' ');
            }
            sb.Append(c);
        }
        return sb.ToString().Trim(); // Trim any leading/trailing spaces
    }

    public static string SensorNameInIndonesia(string sensor)
    {
        var data = new Dictionary<string, string>
        {
            {"humidity","Kelembaban"},
            {"rainfall","Curah Hujan"},
            {"temperature","Suhu"},
            {"windDirection","Arah Angin"},
            {"windSpeed","Kecepatan Angin"},
            {"pressure","Tekanan"},
            {"solarRadiation","Radiasi Matahari"},
            {"evaporation","Penguapan"},
            {"battery","Baterai"},
        };

        return data[sensor];
    }

    public static bool IsCurrentTimeBetween12And07AM()
    {
        DateTime currentTime = DateTime.Now;

        // Define the start and end times for the range
        TimeSpan startTime = new TimeSpan(0, 0, 0); // 12:00 AM
        TimeSpan endTime = new TimeSpan(6, 59, 59); // 06:59 AM

        // Check if the current time is within the range
        if (currentTime.TimeOfDay >= startTime && currentTime.TimeOfDay <= endTime)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public static void StoreInFolder(IFormFile file, string filePath)
    {
        DeleteFileInFolder(filePath);
        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            file.CopyTo(fileStream);
        }
    }

    public static void DeleteFileInFolder(string file)
    {
        if (File.Exists(file))
        {
            File.Delete(file);
        }
    }

    public static string GenerateHeaderDownloadData(MvStation station){
        var result = "";
        var header = $"";
        return result;
    }

    public static string GenerateHourHtml(MvStation station, dynamic data, string periode){
        string style = @" <style>
                    @page {
                    size: 595px 842px; /* A4 size in pixels */
                    margin: 0; /* Set margin to 0 for full page size */
                    }

                    *{
                        letter-spacing: 3px!important;
                    }

                    body {
                    margin: 0;
                    padding: 0;
                    }
                    .container{
                    width: 100%;
                    }

                    .header{
                    overflow: hidden;
                    }
                    .text-title{
                    align-items: center;
                    }
                    .half {
                    width: 50%;
                    float: left; /* Float the elements to achieve the 50% width */
                    box-sizing: border-box; /* Include padding and border in the width */
                    padding: 20px;
                    }

                    /* Clearfix to contain floated elements */
                    .clearfix::after {
                    content: """";
                    display: table;
                    clear: both;
                    }

                    #table_hour {
                    border-collapse: collapse; /* Collapse borders into a single border */
                    width: 100%;
                }

                #table-header {
                    border: none; /* Collapse borders into a single border */
                    width: 100%;
                }

                #table-header th, #table-header td {
                    border: none!important;
                    text-align: left; /* Align text to the left */
                }
                #table_hour th, #table_hour td {
                    border: 1px solid #000; /* Thin black border for table cells */
                    padding: 8px; /* Padding for cell content */
                    text-align: center; /* Align text to the left */
                }

                #table_hour th {
                    background-color: #f2f2f2; /* Background color for table header cells */
                    font-weight: bold; /* Bold text for header cells */
                }

                #table_header th {
                    font-weight: bold; /* Bold text for header cells */
                    border: none!important;
                }
                </style>";

        string firstRows = GenerateLabelReport(station.Type??"");
        string dataRows = GenerateDataReport(station.Type, data);
       
        string addedCol = "";
        string documentTitle = "";
        string tableTitle = "";

        if(station.Type == "AWLR" || station.Type == "V-Notch"){
            addedCol += @"<td></td>";
            documentTitle = "Data Tinggi Muka Air";
            tableTitle = "Table Tinggi Muka Air Per Jam (m)";
        }

        if(station.Type == "ARR"){
            documentTitle = "Data Curah Hujan";
            tableTitle = "Table Curah Hujan Per Jam (mm)";
        }

        string htmlString = @$"
                <!DOCTYPE html>
                <html lang=""en"">
                <head>
                <meta charset=""UTF-8"">
                <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                <title>Template Download Data</title>
                {style}
                </head>
                <body>
                <div class=""container"">
                    <h3 class=""text-title"" style=""text-align: center; border-bottom: 2px solid black;margin-bottom:15px"">{documentTitle}</h3>
                    
                    <div class=""header clearfix"">
                    <div class=""half"">
                        <table style=""border: none;"">
                            <tr style=""border: none;"">
                                <td>Nama Pos</td>
                                <td>: <strong> {station.Name} </strong></td>
                            </tr>
                            <tr>
                                <td>No. Register</td>
                                <td>: {station.NoRegister}</td>
                            </tr>
                            <tr>
                                <td>Wilayah Sugair</td>
                                <td>: {station.RiverAreaName}</td>
                            </tr>
                            <tr>
                                <td>Daerah Wilayah Sungai</td>
                                <td>: {station.WatershedName}</td>
                            </tr>
                            <tr>
                                <td>Koordinat Pos</td>
                                <td>: {station.RiverAreaName}</td>
                            </tr>
                            <tr>
                                <td>Lokasi</td>
                                <td>: {station.VillageName}, {station.DistrictName}, {station.RegencyName}, {station.ProvinceName}</td>
                            </tr>
                        </table>
                    </div>
                    <div class=""half""> 
                        <table>
                        <tr>
                            <td>Bulan</td>
                            <td>: <strong> {indonesianDateTimeService.FormatMonth(DateTime.ParseExact(periode, "yyyy-MM", CultureInfo.InvariantCulture))}</strong></td>
                        </tr>
                        <tr>
                            <td>Tahun Pendirian</td>
                            <td>: {station.BuiltYear}</td>
                        </tr>
                        <tr>
                            <td>Dibangun Oleh</td>
                            <td>: {station.BuiltBy}</td>
                        </tr>
                        <tr>
                            <td>Elevasi Pos</td>
                            <td>: {station.Elevation} mdpl</td>
                        </tr>
                        
                        </table>
                    </div>
                    </div>
                    <div class=""content"">
                    <h4 class=""text-title"" style=""text-align: center;margin-bottom:10px"">{tableTitle}</h4>
                    <table id=""table_hour"">
                        <tr>
                            {firstRows}
                        </tr>
                        <tr>
                            <th>Tanggal</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            {addedCol}
                        </tr>
                        {dataRows}
                    </table>
                    <br>
                    </div>
                </div>
                </body>
                </html>";
        return htmlString;
    }

    public static string GenerateMinuteHtml(MvStation station, dynamic data, string periode)
    {
        string style = @" <style>
                    @page {
                    size: 595px 842px; /* A4 size in pixels */
                    margin: 0; /* Set margin to 0 for full page size */
                    }

                    *{
                        letter-spacing: 3px!important;
                    }

                    body {
                    margin: 0;
                    padding: 0;
                    }
                    .container{
                    width: 100%;
                    }

                    .header{
                    overflow: hidden;
                    }
                    .text-title{
                    align-items: center;
                    }
                    .half {
                    width: 50%;
                    float: left; /* Float the elements to achieve the 50% width */
                    box-sizing: border-box; /* Include padding and border in the width */
                    padding: 20px;
                    }

                    /* Clearfix to contain floated elements */
                    .clearfix::after {
                    content: """";
                    display: table;
                    clear: both;
                    }

                    #table_hour {
                    border-collapse: collapse; /* Collapse borders into a single border */
                    width: 100%;
                }

                #table-header {
                    border: none; /* Collapse borders into a single border */
                    width: 100%;
                }

                #table-header th, #table-header td {
                    border: none!important;
                    text-align: left; /* Align text to the left */
                }
                #table_hour th, #table_hour td {
                    border: 1px solid #000; /* Thin black border for table cells */
                    padding: 8px; /* Padding for cell content */
                    text-align: center; /* Align text to the left */
                }

                #table_hour th {
                    background-color: #f2f2f2; /* Background color for table header cells */
                    font-weight: bold; /* Bold text for header cells */
                }

                #table_header th {
                    font-weight: bold; /* Bold text for header cells */
                    border: none!important;
                }
                </style>";

        string firstRows = GenerateLabelReport(station.Type ?? "");
        string dataRows = GenerateDataReportMinute(station.Type, data);

        string addedCol = "";
        string documentTitle = "";
        string tableTitle = "";

        if (station.Type == "AWLR" || station.Type == "V-Notch")
        {
            addedCol += @"<td></td>";
            documentTitle = "Data Tinggi Muka Air";
            tableTitle = "Table Tinggi Muka Air Per Menit (m)";
        }

        if (station.Type == "ARR")
        {
            documentTitle = "Data Curah Hujan";
            tableTitle = "Table Curah Hujan Per Jam (mm)";
        }

        string htmlString = @$"
                <!DOCTYPE html>
                <html lang=""en"">
                <head>
                <meta charset=""UTF-8"">
                <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                <title>Template Download Data</title>
                {style}
                </head>
                <body>
                <div class=""container"">
                    <h3 class=""text-title"" style=""text-align: center; border-bottom: 2px solid black;margin-bottom:15px"">{documentTitle}</h3>
                    
                    <div class=""header clearfix"">
                    <div class=""half"">
                        <table style=""border: none;"">
                            <tr style=""border: none;"">
                                <td>Nama Pos</td>
                                <td>: <strong> {station.Name} </strong></td>
                            </tr>
                            <tr>
                                <td>No. Register</td>
                                <td>: {station.NoRegister}</td>
                            </tr>
                            <tr>
                                <td>Wilayah Sugair</td>
                                <td>: {station.RiverAreaName}</td>
                            </tr>
                            <tr>
                                <td>Daerah Wilayah Sungai</td>
                                <td>: {station.WatershedName}</td>
                            </tr>
                            <tr>
                                <td>Koordinat Pos</td>
                                <td>: {station.RiverAreaName}</td>
                            </tr>
                            <tr>
                                <td>Lokasi</td>
                                <td>: {station.VillageName}, {station.DistrictName}, {station.RegencyName}, {station.ProvinceName}</td>
                            </tr>
                        </table>
                    </div>
                    <div class=""half""> 
                        <table>
                        <tr>
                            <td>Bulan</td>
                            <td>: <strong> {indonesianDateTimeService.FormatMonth(DateTime.ParseExact(periode, "yyyy-MM", CultureInfo.InvariantCulture))}</strong></td>
                        </tr>
                        <tr>
                            <td>Tahun Pendirian</td>
                            <td>: {station.BuiltYear}</td>
                        </tr>
                        <tr>
                            <td>Dibangun Oleh</td>
                            <td>: {station.BuiltBy}</td>
                        </tr>
                        <tr>
                            <td>Elevasi Pos</td>
                            <td>: {station.Elevation} mdpl</td>
                        </tr>
                        
                        </table>
                    </div>
                    </div>
                    <div class=""content"">
                    <h4 class=""text-title"" style=""text-align: center;margin-bottom:10px"">{tableTitle}</h4>
                    <table id=""table_hour"">
                        <tr>
                            <th>Tanggal</th>
                            <th>Jam / Menit</th>
                            <th>Tinggi Muka Air</th>
                            <th>Elevasi Muka Air</th>
                            <th>Debit</th>
                            <th>Status Level</th>
                        </tr>
                        {dataRows}
                    </table>
                    <br>
                    </div>
                </div>
                </body>
                </html>";
        return htmlString;
    }

    private static string GenerateLabelReport(string type){
        string result = "";
        if(type == "ARR" || type == "AWLR_ARR"){
            result = @"<th>Jam</th>
                        <th>07</th>
                        <th>08</th>
                        <th>09</th>
                        <th>10</th>
                        <th>11</th>
                        <th>12</th>
                        <th>13</th>
                        <th>14</th>
                        <th>15</th>
                        <th>16</th>
                        <th>17</th>
                        <th>18</th>
                        <th>19</th>
                        <th>20</th>
                        <th>21</th>
                        <th>22</th>
                        <th>23</th>
                        <th>00</th>
                        <th>01</th>
                        <th>02</th>
                        <th>03</th>
                        <th>04</th>
                        <th>05</th>
                        <th>06</th>
                        <th>CH Tertinggi (mm)</th>
                        ";
        }else{
            
            result += "<th>Jam</th>";
            for (int i = 0; i < 24; i++)
            {
                if(i < 10 ){
                    result += @$"<th>0{i}</th>";
                }else{
                    result += @$"<th>{i}</th>";
                }
            }
            result += @"<th>TMA Minimum (m)</th>
                        <th>TMA Maksimum (m)</th>";
        }
        return result ;
    }


    private static string GenerateDataReportMinute(string type, dynamic data)
    {
        string result = "";
        if (type == "AWLR")
        {
            foreach (var row in data[0])
            {
                var tempCol = "";
                
                foreach (var col in row)
                {
                    var val = row[col.Key];
                    tempCol += $@"<td>{val}</td>";
                }

                string tempRow = "";
                tempRow = $"<tr>{tempCol}</tr>";

                result += tempRow;
            }

        }

        return result;
    }
    private static string GenerateDataReport(string type, dynamic data){
        string result = "";
        if(type == "AWLR"){
            var AWLR_HOUR_DATA = data[1];
            var AWLR_MIN_MAX = data.Count > 2 ? data[3] : new List<VMMinMaxReport>();
            int index = 0;
            foreach (var row in AWLR_HOUR_DATA)
            {
                var date = row["date"];
                var tempCol = ""; 
                tempCol = $@"<td>{date}</td>";
                foreach (var col in row["data"])
                {
                    var val = row["data"][col.Key] == "-" ? "-" : Convert.ToDouble(row["data"][col.Key]);
                    tempCol += $@"<td>{val}</td>";
                      
                }

                if (AWLR_MIN_MAX.Count > 0)
                {
                    dynamic max = AWLR_MIN_MAX[index].value_max == null ? "-" : AWLR_MIN_MAX[index].value_max;
                    dynamic min = AWLR_MIN_MAX[index].value_min == null ? "-" : AWLR_MIN_MAX[index].value_min;
                    tempCol += $"<td>{min}</td>";
                    tempCol += $"<td>{max}</td>";
                }

                string tempRow = ""; 
                tempRow = $"<tr>{tempCol}</tr>";
                
                result += tempRow;
                index++;
            }
        }

        if(type == "ARR"){

        }

        return result;
    }
}
