using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class PgbenchAccount
{
    public int Aid { get; set; }

    public int? Bid { get; set; }

    public int? Abalance { get; set; }

    public string? Filler { get; set; }
}
