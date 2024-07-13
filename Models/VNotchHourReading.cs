
namespace IrigasiManganti.Models
{
    public class VNotchHourReading
    {
        public Guid StationId { get; set; }
        public DateTime? ReadingHour { get; set; }
        public double? WaterLevel { get; set; }
        public double? Debit { get; set; }
        public string? ChangeStatus { get; set; }
        public double? ChangeValue { get; set; }
        public double? Battery { get; set; }
    }
}