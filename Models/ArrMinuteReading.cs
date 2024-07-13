using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class ArrMinuteReading
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public double Rainfall { get; set; }

    public DateTime ReadingAt { get; set; }

    public double? Battery { get; set; }

    public double? Signal { get; set; }

    public virtual Device Device { get; set; } = null!;
}
