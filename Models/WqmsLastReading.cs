using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class WqmsLastReading
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public DateTime ReadingAt { get; set; }

    public double? Temperature { get; set; }

    public double? Ph { get; set; }

    public double? Orp { get; set; }

    public double? Turbidity { get; set; }

    public double? Battery { get; set; }

    public double? Signal { get; set; }

    public virtual Device Device { get; set; } = null!;
}
