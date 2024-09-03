using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class DebitPengambilan
{
    public Guid Id { get; set; }
    public DateTime? Tanggal{ get; set; }
    public DateTime? Update { get; set; }
    public double? Nilai { get; set; }
    public string? Satuan { get; set; }
}