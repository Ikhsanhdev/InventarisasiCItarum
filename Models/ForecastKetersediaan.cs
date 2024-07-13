using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class ForecastKetersediaan
{
    public Guid Id { get; set; }
    public DateTime? Time { get; set; }
    public decimal? Debit { get; set; }
    public decimal? Min { get; set; }
    public decimal? Max { get; set; }
    public string? PetakTersier {get; set;}
    public string? Bangunan {get; set;}
}
