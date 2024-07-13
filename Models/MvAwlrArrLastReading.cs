using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class MvAwlrArrLastReading
{
    public Guid? Id { get; set; }

    public string? Slug { get; set; }

    public string? OrganizationCode { get; set; }

    public string? Photo { get; set; }

    public string? NoRegister { get; set; }

    public string? Name { get; set; }

    public string? Type { get; set; }

    public double? Elevation { get; set; }

    public double? Latitude { get; set; }

    public double? Longitude { get; set; }

    public string? TimeZone { get; set; }

    public Guid? RiverAreaId { get; set; }

    public string? RiverAreaCode { get; set; }

    public string? RiverAreaName { get; set; }

    public Guid? WatershedId { get; set; }

    public string? WatershedCode { get; set; }

    public string? WatershedName { get; set; }

    public string? ProvinceId { get; set; }

    public string? RegencyId { get; set; }

    public string? DistrictId { get; set; }

    public string? VillageId { get; set; }

    public int? BuiltYear { get; set; }

    public string? BuiltBy { get; set; }

    public int? RenovationYear { get; set; }

    public string? RenovationBy { get; set; }

    public string? Note { get; set; }

    public DateTime? CreatedAt { get; set; }

    public Guid? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public Guid? UpdatedBy { get; set; }

    public DateTime? DeletedAt { get; set; }

    public Guid? DeletedBy { get; set; }

    public string? DeviceId { get; set; }

    public string? NoGsm { get; set; }

    public DateOnly? InstalledDate { get; set; }

    public double? Calibration { get; set; }

    public string? BrandCode { get; set; }

    public string? BrandName { get; set; }

    public string? ProvinceName { get; set; }

    public string? RegencyName { get; set; }

    public string? DistrictName { get; set; }

    public string? VillageName { get; set; }

    public string? UnitDisplay { get; set; }

    public string? UnitSensor { get; set; }

    public double? PeilschaalBasisValue { get; set; }

    public double? PeilschaalBasisElevation { get; set; }

    public double? KonstantaA { get; set; }

    public double? KonstantaB { get; set; }

    public double? Siaga1 { get; set; }

    public double? Siaga2 { get; set; }

    public double? Siaga3 { get; set; }

    public double? HeightMercu { get; set; }

    public double? WaterLevel { get; set; }

    public double? WaterLevelElevation { get; set; }

    public double? Debit { get; set; }

    public double? ChangeValue { get; set; }

    public string? ChangeStatus { get; set; }

    public string? WarningStatus { get; set; }

    public double? WaterLevelMin { get; set; }

    public double? WaterLevelMax { get; set; }

    public double? Rainfall { get; set; }

    public double? RainfallLastHour { get; set; }

    public string? IntensityLastHour { get; set; }

    public double? RainfallLastDay { get; set; }

    public string? IntensityLastDay { get; set; }

    public double? RainfallMax { get; set; }

    public double? Battery { get; set; }

    public DateTime? ReadingAt { get; set; }

    public string? DeviceStatus { get; set; }
}
