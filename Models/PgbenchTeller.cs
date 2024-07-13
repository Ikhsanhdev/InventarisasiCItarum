using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class PgbenchTeller
{
    public int Tid { get; set; }

    public int? Bid { get; set; }

    public int? Tbalance { get; set; }

    public string? Filler { get; set; }
}
