using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class AwsSetting
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public bool IsHumidity { get; set; }

    public bool IsRainfall { get; set; }

    public bool IsPressure { get; set; }

    public bool IsSolarRadiation { get; set; }

    public bool IsTemperature { get; set; }

    public bool IsWindDirection { get; set; }

    public bool IsWindSpeed { get; set; }

    public bool IsEvaporation { get; set; }

    public virtual Device Device { get; set; } = null!;
}
