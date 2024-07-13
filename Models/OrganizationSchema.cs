using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class OrganizationSchema
{
    public Guid Id { get; set; }

    public string OrganizationCode { get; set; } = null!;

    public string? SchemaName { get; set; }

    public string? SchemaFile { get; set; }

    public virtual Organization OrganizationCodeNavigation { get; set; } = null!;

    public virtual ICollection<StationSchema> StationSchemas { get; set; } = new List<StationSchema>();
}
