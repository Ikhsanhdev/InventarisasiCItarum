using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class AwsMinuteReading
{
    public Guid StationId { get; set; }

    public string DeviceId { get; set; } = null!;

    public DateTime ReadingAt { get; set; }

    public double? Humidity { get; set; }
    
    public string? HumidityStatus { get; set; }
    
    public double? Rainfall { get; set; }
    
    public double? Pressure { get; set; }
    
    public double? SolarRadiation { get; set; }
    
    public double? Temperature { get; set; }
    
    public double? WindDirection { get; set; }
    
    public string? WindDirectionStatus { get; set; }
    
    public double? WindSpeed { get; set; }
    
    public double? Evaporation { get; set; }
    
    public double? Battery { get; set; }

    public double? Signal { get; set; }

    public virtual Device Device { get; set; } = null!;
}
