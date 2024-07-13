using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class LogImportDatum
{
    public Guid Id { get; set; }

    public string OrganizationCode { get; set; } = null!;

    public string DeviceId { get; set; } = null!;

    public DateOnly ImportedDate { get; set; }

    public string ImportedBy { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public string Periode { get; set; } = null!;
}
