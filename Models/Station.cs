using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class Station
{
    public Guid Id { get; set; }

    public string OrganizationCode { get; set; } = null!;

    public string? Photo { get; set; }

    public string? NoRegister { get; set; }

    public string Name { get; set; } = null!;

    public string Type { get; set; } = null!;

    public double? Elevation { get; set; }

    public double? Latitude { get; set; }

    public double? Longitude { get; set; }

    public Guid? RiverAreaId { get; set; }

    public Guid? WatershedId { get; set; }

    public string? ProvinceId { get; set; }

    public string? RegencyId { get; set; }

    public string? DistrictId { get; set; }

    public string? VillageId { get; set; }

    public int? BuiltYear { get; set; }

    public string? BuiltBy { get; set; }

    public int? RenovationYear { get; set; }

    public string? RenovationBy { get; set; }

    public string? Note { get; set; }

    public DateTime CreatedAt { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public Guid? UpdatedBy { get; set; }

    public DateTime? DeletedAt { get; set; }

    public Guid? DeletedBy { get; set; }

    public string TimeZone { get; set; } = null!;

    public string? Slug { get; set; }

    public virtual ICollection<Device> Devices { get; set; } = new List<Device>();

    public virtual District? District { get; set; }

    public virtual Organization OrganizationCodeNavigation { get; set; } = null!;

    public virtual Province? Province { get; set; }

    public virtual Regency? Regency { get; set; }

    public virtual RiverArea? RiverArea { get; set; }

    public virtual Village? Village { get; set; }

    public virtual Watershed? Watershed { get; set; }

    public virtual ICollection<WhatsAppNotification> WhatsAppNotifications { get; set; } = new List<WhatsAppNotification>();
}
