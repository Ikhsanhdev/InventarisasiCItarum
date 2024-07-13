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

    public class JqueryDataTableRequestStation
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
        public string? WatershedId { get; set; }
        public string? BrandCode { get; set; }
        public string? Type { get; set; }
        public string? DeviceStatus { get; set; }


    }
}
