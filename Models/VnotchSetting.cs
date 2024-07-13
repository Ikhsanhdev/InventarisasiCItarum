using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class VnotchSetting
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public string UnitSensor { get; set; } = null!;

    public string UnitDisplay { get; set; } = null!;

    public string UnitDebit { get; set; } = null!;

    public double KonstantaC { get; set; }

    public double Exponent { get; set; }

    public virtual Device Device { get; set; } = null!;
}
