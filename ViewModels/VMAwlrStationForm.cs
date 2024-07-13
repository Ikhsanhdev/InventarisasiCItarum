namespace IrigasiManganti.ViewModels
{
    public class VMAwlrStationForm
    {
        public Guid? StationId { get; set; }
        public string? DeviceId { get; set; }
        public double? Calibration { get; set; }
        public string? UnitSensor { get; set; }
        public string? UnitDisplay { get; set; }
        public double? Siaga1 { get; set; }
        public double? Siaga2 { get; set; }
        public double? Siaga3 { get; set; }
        public double? KonstantaA { get; set; }
        public double? KonstantaB { get; set; }
        public double? PeilschaalBasisElevation { get; set; }
        public double? PeilschaalBasisValue { get; set; }
        public double? HeightMercu { get; set; }
    }
}
