using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class WqmsDayReading
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public DateOnly ReadingDate { get; set; }

    public string ReadingDateOnly { get; set; }

    public double? TemperatureAvg { get; set; }

    public double? PhAvg { get; set; }

    public double? OrpAvg { get; set; }

    public double? TurbidityAvg { get; set; }

    public double? BatteryAvg { get; set; }

    public double? SignalAvg { get; set; }

    public virtual Device Device { get; set; } = null!;
}
