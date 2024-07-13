using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class StationSchema
{
    public Guid Id { get; set; }

    public Guid OrganizationSchemaId { get; set; }

    public Guid? StationId { get; set; }

    public string No { get; set; } = null!;

    public string Color { get; set; } = null!;

    public string Type { get; set; } = null!;

    public decimal? Latitude { get; set; }

    public decimal? Longitude { get; set; }

    public string? KoordinatS { get; set; }

    public string? KoordinatE { get; set; }

    public decimal? TextLongt { get; set; }

    public string? TypeElement { get; set; }

    public decimal? Latitude2 { get; set; }

    public decimal? Longitude2 { get; set; }

    public virtual OrganizationSchema OrganizationSchema { get; set; } = null!;
}
