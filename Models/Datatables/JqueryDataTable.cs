using Microsoft.VisualBasic;

namespace IrigasiManganti.Models.Datatables
{
    public class JqueryDataTableRequest
    {
        public string? Draw { get; set; }
        public string? Start { get; set; }
        public string? Length { get; set; }
        public string? SortColumn { get; set; }
        public string? SortColumnDirection { get; set; }
        public string? SearchValue { get; set; }
        public int PageSize { get; set; }
        public int Skip { get; set; }
        public int RecordsTotal { get; set; }
    }

    public class JqueryDataTableRequestDebitBendung
    {
        public string? Draw { get; set; }
        public string? Start { get; set; }
        public string? Length { get; set; }
        public string? SortColumn { get; set; }
        public string? SortColumnDirection { get; set; }
        public string? SearchValue { get; set; }
        public int PageSize { get; set; }
        public int Skip { get; set; }
        public int RecordsTotal { get; set; }
        public string? RangeDate { get; set; }


    }

    public class JqueryDataTableRequestKebutuhan : JqueryDataTableRequest{
        public int Year { get; set; } = DateAndTime.Now.Year;
        public int Month { get; set; } = DateAndTime.Now.Month;
        public int Periode { get; set; } = DateAndTime.Now.Day < 16 ? 1 : 2;
    }
}
