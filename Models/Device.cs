using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class Device
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public string BrandCode { get; set; } = null!;

    public string? NoGsm { get; set; }

    public DateOnly? InstalledDate { get; set; }

    public double? Calibration { get; set; }

    public int? Sequence { get; set; }

    public virtual ArrLastReading? ArrLastReading { get; set; }

    public virtual AwlrLastReading? AwlrLastReading { get; set; }

    public virtual AwlrSetting? AwlrSetting { get; set; }

    public virtual AwsLastReading? AwsLastReading { get; set; }

    public virtual AwsSetting? AwsSetting { get; set; }

    public virtual Brand BrandCodeNavigation { get; set; } = null!;

    public virtual PiezometerLastReading? PiezometerLastReading { get; set; }

    public virtual PiezometerSetting? PiezometerSetting { get; set; }

    public virtual Station Station { get; set; } = null!;

    public virtual VnotchLastReading? VnotchLastReading { get; set; }

    public virtual VnotchSetting? VnotchSetting { get; set; }

    public virtual WqmsLastReading? WqmsLastReading { get; set; }
}
