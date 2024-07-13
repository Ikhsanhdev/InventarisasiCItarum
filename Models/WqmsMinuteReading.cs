using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class WqmsMinuteReading
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public DateTime ReadingAt { get; set; }

    public double? Temperature { get; set; }

    public double? Ph { get; set; }

    public double? Orp { get; set; }

    public double? Turbidity { get; set; }

    public double? Battery { get; set; }

    public double? TemperatureSensor { get; set; }

    public double? PhSensor { get; set; }

    public double? OrpSensor { get; set; }

    public double? TurbiditySensor { get; set; }

    public double? BatterySensor { get; set; }

    public double? Signal { get; set; }

    public virtual Device Device { get; set; } = null!;
}
