using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class AwlrHourReading
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public DateTime ReadingHour { get; set; }

    public double WaterLevel { get; set; }

    public double? WaterLevelElevation { get; set; }

    public double? Debit { get; set; }

    public string? ChangeStatus { get; set; }

    public double? ChangeValue { get; set; }

    public string? WarningStatus { get; set; }

    public DateTime ReadingAt { get; set; }

    public double? Battery { get; set; }

    public double? Signal { get; set; }

    public virtual Device Device { get; set; } = null!;
}
