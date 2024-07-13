using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class DamLake
{
    public Guid Id { get; set; }

    public string OrganizationCode { get; set; } = null!;

    public string Name { get; set; } = null!;

    public double? Latitude { get; set; }

    public double? Longitude { get; set; }

    public double? MapZoom { get; set; }

    public string? ShpFile { get; set; }

    public DateTime CreatedAt { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public Guid? UpdatedBy { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual Organization OrganizationCodeNavigation { get; set; } = null!;

    public virtual User? UpdatedByNavigation { get; set; }
}
