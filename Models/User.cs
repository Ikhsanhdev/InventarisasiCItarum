using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string? Username { get; set; }

    public string Name { get; set; } = null!;

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string Password { get; set; } = null!;

    public string? Pin { get; set; }

    public string RoleCode { get; set; } = null!;

    public DateTime? LastLogin { get; set; }

    public DateTime CreatedAt { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public Guid? UpdatedBy { get; set; }

    public DateTime? DeletedAt { get; set; }

    public Guid? DeletedBy { get; set; }

    public string? AccessToken { get; set; }

    public long? ExpiredAt { get; set; }

    public string? Photo { get; set; }

    public virtual ICollection<DamLake> DamLakeCreatedByNavigations { get; set; } = new List<DamLake>();

    public virtual ICollection<DamLake> DamLakeUpdatedByNavigations { get; set; } = new List<DamLake>();

    public virtual ICollection<OrganizationHasUser> OrganizationHasUsers { get; set; } = new List<OrganizationHasUser>();

    public virtual ICollection<RiverArea> RiverAreaCreatedByNavigations { get; set; } = new List<RiverArea>();

    public virtual ICollection<RiverArea> RiverAreaUpdatedByNavigations { get; set; } = new List<RiverArea>();

    public virtual Role RoleCodeNavigation { get; set; } = null!;

    public virtual ICollection<Watershed> WatershedCreatedByNavigations { get; set; } = new List<Watershed>();

    public virtual ICollection<Watershed> WatershedUpdatedByNavigations { get; set; } = new List<Watershed>();
}
