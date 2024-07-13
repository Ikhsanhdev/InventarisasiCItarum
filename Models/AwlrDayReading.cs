using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class AwlrDayReading
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public DateOnly ReadingDate { get; set; }

    public string? ReadingDateOnly { get; set; }

    public double? WaterLevelAvg { get; set; }

    public double? WaterLevelMin { get; set; }

    public double? WaterLevelMax { get; set; }

    public virtual Device Device { get; set; } = null!;
}
