using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class PgbenchHistory
{
    public int? Tid { get; set; }

    public int? Bid { get; set; }

    public int? Aid { get; set; }

    public int? Delta { get; set; }

    public DateTime? Mtime { get; set; }

    public string? Filler { get; set; }
}
