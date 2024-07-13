
namespace IrigasiManganti.Models
{
    public class VNotchMinuteReading
    {
        public Guid StationId { get; set; }
        public DateTime? ReadingAt { get; set; }
        public double? WaterLevel { get; set; }
        public double? Debit { get; set; }
        public string? ChangeStatus { get; set; }
        public double? ChangeValue { get; set; }
        public double? Battery { get; set; }
    }
}