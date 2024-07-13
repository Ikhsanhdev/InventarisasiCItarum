
namespace IrigasiManganti.Models
{
    public class PiezometerDayReading : CommonPropertiesPiezometer
    {
        public DateOnly ReadingDate { get; set; }
        public DateTime ReadingDateOnly { get; set; }
        public double? WaterLevelAvg { get; set; }
        public double? WaterLevelMin { get; set; }
        public double? WaterLevelMax { get; set; }
    }
}