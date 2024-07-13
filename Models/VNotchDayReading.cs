
namespace IrigasiManganti.Models
{
    public class VNotchDayReading
    {
        public Guid StationId { get; set; }
        public string ReadingDateOnly { get; set; }
        public DateOnly? ReadingDate { get; set; }
        public double? WaterLevelAvg { get; set; }
        public double? WaterLevelMin { get; set; }
        public double? WaterLevelMax { get; set; }
        public double? DebitAvg { get; set; }
        public double? DebitMin { get; set; }
        public double? DebitMax { get; set; }
        public double? Battery { get; set; }
    }
}