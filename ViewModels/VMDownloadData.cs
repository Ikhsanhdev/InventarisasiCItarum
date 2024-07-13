namespace IrigasiManganti.ViewModels;

public class VMDownloadData
{
    public class VMReportArrMinute
    {
        public DateTime reading_at { get; set; }
        public double? rainfall { get; set; }
    }
    public class VMReportArrHour
    {
        public DateTime reading_hour { get; set; }
        public double? rainfall { get; set; }
        public string? hour { get; set; }
        public string? date { get; set; }
    }
    public class VMReportArrDaily
    {
        public DateTime reading_date { get; set; }
        public double? rainfall { get; set; }
        public string? intensity { get; set; }
    }

    public class VMReportAwlrMinutes
    {
        public DateTime reading_at { get; set; }
        public double? water_level { get; set; }
        public double? debit { get; set; }
        public string? warning_status { get; set; }
        public double? water_level_elevation { get; set; }
    }

    public class VMReportAwlrHours
    {
        public DateTime reading_hour { get; set; }
        public double? water_level { get; set; }
        public string? hour { get; set; }
        public string? date { get; set; }
    }

    public class VMReportVNotchHour : VMReportAwlrHours { }

    public class VMSummaryReportAwlr
    {
        public double value { get; set; }
        public DateTime date { get; set; }
    }
}