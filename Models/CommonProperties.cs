
namespace IrigasiManganti.Models
{
    public class CommonPropertiesPiezometer
    {
        public Guid StationId { get; set; }
        public string DeviceId { get; set; } = null!;
        
    }

    public class CommonPiezometerMinuteHour : CommonPropertiesPiezometer
    {
        public string? ChangeStatus { get; set; }
        public double? ChangeValue { get; set; }
        public double? WaterLevel { get; set; }
        public double? Battery { get; set; }
        public double? Signal { get; set; }
    }


}