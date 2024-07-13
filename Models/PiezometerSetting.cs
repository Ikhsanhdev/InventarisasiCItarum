using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class PiezometerSetting
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public string UnitSensor { get; set; } = null!;

    public string UnitDisplay { get; set; } = null!;

    public virtual Device Device { get; set; } = null!;
}
