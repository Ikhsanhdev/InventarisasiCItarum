using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class MasterPetak
{
    public Guid Id { get; set; }
    public string? NamaPetak { get; set; }
    public string? JenisBangunan { get; set; }
    public double? Luas { get; set; }
    // public Guid BangunanId { get; set; }
    public double? DebitKebutuhan { get; set; }
    public string? Location {get; set;}
}