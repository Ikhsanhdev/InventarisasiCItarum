using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class AwsDayReading
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public DateOnly ReadingDate { get; set; }
    public DateTime ReadingDateOnly { get; set; }

    public double? HumidityAvg { get; set; }

    public string? HumidityStatus { get; set; }

    public double? Rainfall { get; set; }

    public string? Intensity { get; set; }

    public double? RainfallMax { get; set; }

    public double? PressureAvg { get; set; }

    public double? SolarRadiationAvg { get; set; }

    public double? TemperatureAvg { get; set; }

    public double? WindDirectionAvg { get; set; }

    public string? WindDirectionStatus { get; set; }

    public double? WindSpeedAvg { get; set; }

    public double? EvaporationAvg { get; set; }

    public virtual Device Device { get; set; } = null!;
}
