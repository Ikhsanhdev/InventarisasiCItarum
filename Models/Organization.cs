using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class Organization
{
    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Category { get; set; } = null!;

    public string SubDomain { get; set; } = null!;

    public string? SubDomainOld { get; set; }

    public string Timezone1 { get; set; } = null!;

    public string? Timezone2 { get; set; }

    public string? ShpFileArea { get; set; }

    public string? Logo { get; set; }

    public string? Favicon { get; set; }

    public double? MapLatitude { get; set; }

    public double? MapLongitude { get; set; }

    public double? MapZoom { get; set; }

    public string? TextLogo1 { get; set; }

    public string? TextLogo2 { get; set; }

    public string? TextLogo3 { get; set; }

    public string? TextFooter { get; set; }

    public string? HomeTemplate { get; set; }

    public virtual ICollection<CallBackUrl> CallBackUrls { get; set; } = new List<CallBackUrl>();

    public virtual ICollection<Cctv> Cctvs { get; set; } = new List<Cctv>();

    public virtual ICollection<DamLake> DamLakes { get; set; } = new List<DamLake>();

    public virtual ICollection<OrganizationHasBrand> OrganizationHasBrands { get; set; } = new List<OrganizationHasBrand>();

    public virtual ICollection<OrganizationHasProvince> OrganizationHasProvinces { get; set; } = new List<OrganizationHasProvince>();

    public virtual ICollection<OrganizationHasUser> OrganizationHasUsers { get; set; } = new List<OrganizationHasUser>();

    public virtual ICollection<OrganizationSchema> OrganizationSchemas { get; set; } = new List<OrganizationSchema>();

    public virtual ICollection<RiverArea> RiverAreas { get; set; } = new List<RiverArea>();

    public virtual ICollection<Station> Stations { get; set; } = new List<Station>();

    public virtual ICollection<WhatsAppRecipient> WhatsAppRecipients { get; set; } = new List<WhatsAppRecipient>();
}
