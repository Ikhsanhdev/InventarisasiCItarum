using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class ArrLastReading
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public DateTime ReadingAt { get; set; }

    public double? Rainfall { get; set; }

    public double? RainfallHour { get; set; }

    public string? IntensityHour { get; set; }

    public double? RainfallMax { get; set; }

    public double? Battery { get; set; }

    public double? Signal { get; set; }

    public double RainfallLastHour { get; set; }

    public string IntensityLastHour { get; set; } = null!;

    public double RainfallLastDay { get; set; }

    public string IntensityLastDay { get; set; } = null!;

    public virtual Device Device { get; set; } = null!;
}
