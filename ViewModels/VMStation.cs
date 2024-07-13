using System;
using System.Collections.Generic;
using IrigasiManganti.Models;
using IrigasiManganti.ViewModels;

namespace IrigasiManganti.ViewModels
{
    public class VMStation
    {
        public Guid? Id { get; set; }
        public IFormFile? StationImage { get; set; } = null!;
        public string? StationImagePath { get; set; }
        public string StationName { get; set; } = null!;
        public string StationType { get; set; } = null!;
        public string? NoRegister { get; set; }
        public double? Elevation { get; set; }
        public int? BuiltYear { get; set; }
        public string? BuiltBy { get; set; }
        public int? RenovationYear { get; set; }
        public string? RenovationBy { get; set; }
        public string? Note { get; set; }
        public Guid? RiverAreaId { get; set; }
        public Guid? WatershedId { get; set; }
        public string TimeZone { get; set; }
        public string Slug { get; set; }

        // Location
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string? ProvinceId { get; set; }
        public string? RegencyId { get; set; }
        public string? DistrictId { get; set; }
        public string? VillageId { get; set; }

        // Device Information
        public string BrandCode { get; set; }
        public string? BrandName { get; set; } = null!;
        public string? DeviceId { get; set; }
        public string UnitSensor { get; set; } = null!;
        public string UnitDisplay { get; set; } = null!;
        public string? NoGsm { get; set; }
        public string? InstalledDate { get; set; }
        public double? Calibration { get; set; }
        public bool? IsNewDevice { get; set; }

        // Status Level
        public double? Siaga1 { get; set; }
        public double? Siaga2 { get; set; }
        public double? Siaga3 { get; set; }

        public double? HeightMercu { get; set; }

        // Perhitungan Debit & Peilschaal
        public double? KonstantaA { get; set; }
        public double? KonstantaB { get; set; }
        public double? PeilschaalBasisValue { get; set; }
        public double? PeilschaalBasisElevation { get; set; }

        // Additional Data
        public string? Status { get; set; }
        public DateTime? LastReadingAt { get; set; }
        public AwlrLastReading? AwlrLastReading { get; set; }
        public ArrLastReading? ArrLastReading { get; set; }
        public string[] Sensor { get; set; }
    }
}
