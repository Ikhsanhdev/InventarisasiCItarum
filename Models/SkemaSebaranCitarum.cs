using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class SkemaSebaranCitarum
{
    public int Id { get; set; }

    public string Jenis { get; set; } = null!;

    public string Warna { get; set; } = null!;

    public decimal Lat { get; set; }

    public decimal Longt { get; set; }

    public string? Nama { get; set; }

    public decimal? Opacity { get; set; }

    public decimal? Radius { get; set; }

    public decimal? Longt1 { get; set; }

    public string? Type { get; set; }
}
