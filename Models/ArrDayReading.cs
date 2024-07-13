using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class ArrDayReading
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public DateOnly ReadingDate { get; set; }
    public string? ReadingDateOnly { get; set; }

    public double Rainfall { get; set; }

    public string? Intensity { get; set; }

    public double? RainfallMax { get; set; }

    public virtual Device Device { get; set; } = null!;
}
