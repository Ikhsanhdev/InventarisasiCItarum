using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class Province
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Latitude { get; set; }

    public string? Longitude { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<OrganizationHasProvince> OrganizationHasProvinces { get; set; } = new List<OrganizationHasProvince>();

    public virtual ICollection<Regency> Regencies { get; set; } = new List<Regency>();

    public virtual ICollection<Station> Stations { get; set; } = new List<Station>();
}
