using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class Skema
{
    public Guid Id { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public int? IconHeight { get; set; }
    public int? IconWidth { get; set; }
    public string? IconUrl { get; set; }
    public string? Type {get; set;}
    public string? Lokasi { get; set;}
}