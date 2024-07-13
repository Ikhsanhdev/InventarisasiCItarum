using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class ArrHourReading
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public DateTime ReadingHour { get; set; }

    public double Rainfall { get; set; }

    public string? Intensity { get; set; }

    public virtual Device Device { get; set; } = null!;
}
