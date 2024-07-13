using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class AwlrArrLastReading
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public DateTime ReadingAt { get; set; }

    public double WaterLevel { get; set; }

    public double? WaterLevelElevation { get; set; }

    public double WaterLevelSensor { get; set; }

    public double? Debit { get; set; }

    public double? ChangeValue { get; set; }

    public string? ChangeStatus { get; set; }

    public string? WarningStatus { get; set; }

    public double? WaterLevelMin { get; set; }

    public double? WaterLevelMax { get; set; }

    public double? Rainfall { get; set; }

    public double? RainfallMax { get; set; }

    public double? RainfallLastHour { get; set; }

    public string? IntensityLastHour { get; set; }

    public double? RainfallLastDay { get; set; }

    public string? IntensityLastDay { get; set; }

    public double? Battery { get; set; }

    public double? Signal { get; set; }
}
