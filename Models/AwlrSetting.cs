using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class AwlrSetting
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public string UnitSensor { get; set; } = null!;

    public string UnitDisplay { get; set; } = null!;

    public double? KonstantaA { get; set; }

    public double? KonstantaB { get; set; }

    public double? Siaga1 { get; set; }

    public double? Siaga2 { get; set; }

    public double? Siaga3 { get; set; }

    public double? PeilschaalBasisValue { get; set; }

    public double? PeilschaalBasisElevation { get; set; }

    public double? HeightMercu { get; set; }

    public virtual Device Device { get; set; } = null!;
}
