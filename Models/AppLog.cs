using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class AppLog
{
    public string? Message { get; set; }

    public string? MessageTemplate { get; set; }

    public string? Level { get; set; }

    public DateTime? RaiseDate { get; set; }

    public string? Exception { get; set; }

    public string? Properties { get; set; }

    public string? PropsTest { get; set; }

    public string? MachineName { get; set; }
}
