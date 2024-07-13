using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class LogImportMonth
{
    public Guid Id { get; set; }

    public string DeviceId { get; set; } = null!;

    public string ImportedMonth { get; set; } = null!;

    public string? Status { get; set; }

    public string? SubDomain { get; set; }

    public string? StationType { get; set; }

    public string? LastImportDate { get; set; }

    public long? JobId { get; set; }
}
