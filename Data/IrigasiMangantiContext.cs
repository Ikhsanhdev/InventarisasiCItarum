using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using IrigasiManganti.Models;

namespace IrigasiManganti.Data;

public partial class IrigasiMangantiContext : DbContext
{
    public IrigasiMangantiContext()
    {
    }

    public IrigasiMangantiContext(DbContextOptions<IrigasiMangantiContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ArrLastReading> ArrLastReadings { get; set; }

    public virtual DbSet<AwlrArrLastReading> AwlrArrLastReadings { get; set; }

    public virtual DbSet<AwlrLastReading> AwlrLastReadings { get; set; }

    public virtual DbSet<AwlrSensorType> AwlrSensorTypes { get; set; }

    public virtual DbSet<AwlrSetting> AwlrSettings { get; set; }

    public virtual DbSet<AwsLastReading> AwsLastReadings { get; set; }

    public virtual DbSet<AwsSetting> AwsSettings { get; set; }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<CallBackUrl> CallBackUrls { get; set; }

    public virtual DbSet<Cctv> Cctvs { get; set; }

    public virtual DbSet<DamLake> DamLakes { get; set; }

    public virtual DbSet<Device> Devices { get; set; }

    public virtual DbSet<District> Districts { get; set; }

    public virtual DbSet<LogImportDatum> LogImportData { get; set; }

    public virtual DbSet<LogImportMonth> LogImportMonths { get; set; }

    public virtual DbSet<MvArrLastReading> MvArrLastReadings { get; set; }

    public virtual DbSet<MvAwlrArrLastReading> MvAwlrArrLastReadings { get; set; }

    public virtual DbSet<MvAwlrLastReading> MvAwlrLastReadings { get; set; }

    public virtual DbSet<MvAwsLastReading> MvAwsLastReadings { get; set; }

    public virtual DbSet<MvDevice> MvDevices { get; set; }

    public virtual DbSet<MvPiezometerLastReading> MvPiezometerLastReadings { get; set; }

    public virtual DbSet<MvStation> MvStations { get; set; }

    public virtual DbSet<MvVnotchLastReading> MvVnotchLastReadings { get; set; }

    public virtual DbSet<MvWqmsLastReading> MvWqmsLastReadings { get; set; }

    public virtual DbSet<Organization> Organizations { get; set; }

    public virtual DbSet<OrganizationHasBrand> OrganizationHasBrands { get; set; }

    public virtual DbSet<OrganizationHasProvince> OrganizationHasProvinces { get; set; }

    public virtual DbSet<OrganizationHasUser> OrganizationHasUsers { get; set; }

    public virtual DbSet<OrganizationSchema> OrganizationSchemas { get; set; }

    public virtual DbSet<PgbenchAccount> PgbenchAccounts { get; set; }

    public virtual DbSet<PgbenchBranch> PgbenchBranches { get; set; }

    public virtual DbSet<PgbenchHistory> PgbenchHistories { get; set; }

    public virtual DbSet<PgbenchTeller> PgbenchTellers { get; set; }

    public virtual DbSet<PiezometerLastReading> PiezometerLastReadings { get; set; }

    public virtual DbSet<PiezometerSetting> PiezometerSettings { get; set; }

    public virtual DbSet<Province> Provinces { get; set; }

    public virtual DbSet<Regency> Regencies { get; set; }

    public virtual DbSet<RiverArea> RiverAreas { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SchemaList> SchemaLists { get; set; }

    public virtual DbSet<Station> Stations { get; set; }

    public virtual DbSet<StationSchema> StationSchemas { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Village> Villages { get; set; }

    public virtual DbSet<VnotchLastReading> VnotchLastReadings { get; set; }

    public virtual DbSet<VnotchSetting> VnotchSettings { get; set; }

    public virtual DbSet<Watershed> Watersheds { get; set; }

    // public virtual DbSet<WhatsAppNotification> WhatsAppNotifications { get; set; }

    public virtual DbSet<WhatsAppRecipient> WhatsAppRecipients { get; set; }

    public virtual DbSet<WqmsLastReading> WqmsLastReadings { get; set; }
    public virtual DbSet<ForecastKetersediaan> ForecastKetersediaans { get; set; }
    public virtual DbSet<Skema> Skemas { get; set; }
    public virtual DbSet<MasterPetak> MasterPetaks { get; set; }
    public virtual DbSet<DebitPengambilan> DebitPengambilans { get; set; }
    public virtual DbSet<DebitHulu> DebitHulus { get; set; }
    public virtual DbSet<Sumur> Sumurs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Name=ConnectionStrings:DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("uuid-ossp");

        modelBuilder.Entity<ArrLastReading>(entity =>
        {
            entity.HasKey(e => new { e.StationId, e.DeviceId }).HasName("arr_last_readings_pkey");

            entity.HasIndex(e => e.DeviceId, "idx_arr_last_readings_device_id");

            entity.HasIndex(e => e.Rainfall, "idx_arr_last_readings_rainfall");

            entity.HasIndex(e => e.ReadingAt, "idx_arr_last_readings_reading_at")
                .IsDescending()
                .HasNullSortOrder(new[] { NullSortOrder.NullsLast });

            entity.HasIndex(e => e.StationId, "idx_arr_last_readings_station_id");

            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.IntensityHour).HasMaxLength(255);
            entity.Property(e => e.IntensityLastDay).HasMaxLength(255);
            entity.Property(e => e.IntensityLastHour).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");

            entity.HasOne(d => d.Device).WithOne(p => p.ArrLastReading)
                .HasForeignKey<ArrLastReading>(d => new { d.StationId, d.DeviceId })
                .HasConstraintName("arr_last_readings_device_foreign");
        });

        modelBuilder.Entity<AwlrArrLastReading>(entity =>
        {
            entity.HasKey(e => new { e.StationId, e.DeviceId }).HasName("AwlrArrLastReadings_pkey");

            entity.HasIndex(e => e.DeviceId, "idx_awlr_arr_last_readings_device_id");

            entity.HasIndex(e => e.Rainfall, "idx_awlr_arr_last_readings_rainfall");

            entity.HasIndex(e => e.ReadingAt, "idx_awlr_arr_last_readings_reading_at");

            entity.HasIndex(e => e.StationId, "idx_awlr_arr_last_readings_station_id");

            entity.HasIndex(e => e.WarningStatus, "idx_awlr_arr_last_readings_warning_status");

            entity.HasIndex(e => e.WaterLevel, "idx_awlr_arr_last_readings_water_level");

            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.ChangeStatus).HasMaxLength(255);
            entity.Property(e => e.IntensityLastDay).HasMaxLength(255);
            entity.Property(e => e.IntensityLastHour).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.WarningStatus).HasMaxLength(255);
        });

        modelBuilder.Entity<AwlrLastReading>(entity =>
        {
            entity.HasKey(e => new { e.StationId, e.DeviceId }).HasName("awlr_last_readings_pkey");

            entity.HasIndex(e => e.DeviceId, "idx_awlr_last_readings_device_id");

            entity.HasIndex(e => e.ReadingAt, "idx_awlr_last_readings_reading_at");

            entity.HasIndex(e => e.StationId, "idx_awlr_last_readings_station_id");

            entity.HasIndex(e => e.WarningStatus, "idx_awlr_last_readings_warning_status");

            entity.HasIndex(e => e.WaterLevel, "idx_awlr_last_readings_water_level");

            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.ChangeStatus).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.WarningStatus).HasMaxLength(255);

            entity.HasOne(d => d.Device).WithOne(p => p.AwlrLastReading)
                .HasForeignKey<AwlrLastReading>(d => new { d.StationId, d.DeviceId })
                .HasConstraintName("fk_awlr_last_readings_device");
        });

        modelBuilder.Entity<AwlrSensorType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("AwlrSensorTypes_pkey");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<AwlrSetting>(entity =>
        {
            entity.HasKey(e => new { e.StationId, e.DeviceId }).HasName("awlr_settings_pkey");

            entity.HasIndex(e => e.DeviceId, "idx_awlr_settings_device_id");

            entity.HasIndex(e => e.Siaga1, "idx_awlr_settings_siaga1");

            entity.HasIndex(e => e.Siaga2, "idx_awlr_settings_siaga2");

            entity.HasIndex(e => e.Siaga3, "idx_awlr_settings_siaga3");

            entity.HasIndex(e => e.StationId, "idx_awlr_settings_station_id");

            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.UnitDisplay).HasMaxLength(255);
            entity.Property(e => e.UnitSensor).HasMaxLength(255);

            entity.HasOne(d => d.Device).WithOne(p => p.AwlrSetting)
                .HasForeignKey<AwlrSetting>(d => new { d.StationId, d.DeviceId })
                .HasConstraintName("awlr_settings_device_foreign");
        });

        modelBuilder.Entity<AwsLastReading>(entity =>
        {
            entity.HasKey(e => new { e.StationId, e.DeviceId }).HasName("aws_last_readings_pkey");

            entity.HasIndex(e => e.DeviceId, "idx_aws_last_readings_device_id");

            entity.HasIndex(e => e.Evaporation, "idx_aws_last_readings_evaporation");

            entity.HasIndex(e => e.Humidity, "idx_aws_last_readings_humidity");

            entity.HasIndex(e => e.Pressure, "idx_aws_last_readings_pressure");

            entity.HasIndex(e => e.ReadingAt, "idx_aws_last_readings_reading_at");

            entity.HasIndex(e => e.SolarRadiation, "idx_aws_last_readings_solar_radiation");

            entity.HasIndex(e => e.StationId, "idx_aws_last_readings_station_id");

            entity.HasIndex(e => e.Temperature, "idx_aws_last_readings_temperature");

            entity.HasIndex(e => e.WindDirection, "idx_aws_last_readings_wind_direction");

            entity.HasIndex(e => e.WindSpeed, "idx_aws_last_readings_wind_speed");

            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.HumidityStatus).HasMaxLength(50);
            entity.Property(e => e.IntensityLastDay).HasMaxLength(255);
            entity.Property(e => e.IntensityLastHour).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.WindDirectionStatus).HasMaxLength(50);

            entity.HasOne(d => d.Device).WithOne(p => p.AwsLastReading)
                .HasForeignKey<AwsLastReading>(d => new { d.StationId, d.DeviceId })
                .HasConstraintName("fk_aws_last_readings_device");
        });

        modelBuilder.Entity<AwsSetting>(entity =>
        {
            entity.HasKey(e => new { e.StationId, e.DeviceId }).HasName("aws_settings_pkey");

            entity.HasIndex(e => e.DeviceId, "idx_aws_settings_device_id");

            entity.HasIndex(e => e.IsEvaporation, "idx_aws_settings_is_evaporation");

            entity.HasIndex(e => e.IsHumidity, "idx_aws_settings_is_humidity");

            entity.HasIndex(e => e.IsPressure, "idx_aws_settings_is_pressure");

            entity.HasIndex(e => e.IsRainfall, "idx_aws_settings_is_rainfall");

            entity.HasIndex(e => e.IsSolarRadiation, "idx_aws_settings_is_solar_radiation");

            entity.HasIndex(e => e.IsTemperature, "idx_aws_settings_is_temperature");

            entity.HasIndex(e => e.IsWindDirection, "idx_aws_settings_is_wind_direction");

            entity.HasIndex(e => e.IsWindSpeed, "idx_aws_settings_is_wind_speed");

            entity.HasIndex(e => e.StationId, "idx_aws_settings_station_id");

            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.IsEvaporation).HasDefaultValue(false);
            entity.Property(e => e.IsHumidity).HasDefaultValue(false);
            entity.Property(e => e.IsPressure).HasDefaultValue(false);
            entity.Property(e => e.IsRainfall).HasDefaultValue(false);
            entity.Property(e => e.IsSolarRadiation).HasDefaultValue(false);
            entity.Property(e => e.IsTemperature).HasDefaultValue(false);
            entity.Property(e => e.IsWindDirection).HasDefaultValue(false);
            entity.Property(e => e.IsWindSpeed).HasDefaultValue(false);

            entity.HasOne(d => d.Device).WithOne(p => p.AwsSetting)
                .HasForeignKey<AwsSetting>(d => new { d.StationId, d.DeviceId })
                .HasConstraintName("aws_settings_device_foreign");
        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(e => e.Code).HasName("Brands_pkey");

            entity.HasIndex(e => e.Name, "idx_brand_name");

            entity.Property(e => e.Code).HasMaxLength(4);
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<CallBackUrl>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("CallBackUrls_pkey");

            entity.HasIndex(e => e.OrganizationCode, "idx_callback_urls_organization_code");

            entity.HasIndex(e => e.Url, "idx_callback_urls_url");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.Url).HasMaxLength(255);

            entity.HasOne(d => d.OrganizationCodeNavigation).WithMany(p => p.CallBackUrls)
                .HasForeignKey(d => d.OrganizationCode)
                .HasConstraintName("fk_callback_urls_organization_code");
        });

        modelBuilder.Entity<Cctv>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("cctvs_pkey");

            entity.HasIndex(e => e.OrganizationCode, "idx_cctvs_organization_code");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.Type).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");

            entity.HasOne(d => d.OrganizationCodeNavigation).WithMany(p => p.Cctvs)
                .HasForeignKey(d => d.OrganizationCode)
                .HasConstraintName("fk_cctvs_organization_code");
        });

        // modelBuilder.Entity<DamLake>(entity =>
        // {
        //     entity.HasKey(e => e.Id).HasName("DamLakes_pkey");

        //     entity.HasIndex(e => e.Name, "idx_dam_lakes_name");

        //     entity.HasIndex(e => e.OrganizationCode, "idx_dam_lakes_organization_code");

        //     entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
        //     entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
        //     entity.Property(e => e.Name).HasMaxLength(255);
        //     entity.Property(e => e.OrganizationCode).HasMaxLength(10);
        //     entity.Property(e => e.ShpFile)
        //         .HasMaxLength(255)
        //         .HasDefaultValueSql("NULL::character varying");
        //     entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");

        //     entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.DamLakeCreatedByNavigations)
        //         .HasForeignKey(d => d.CreatedBy)
        //         .OnDelete(DeleteBehavior.ClientSetNull)
        //         .HasConstraintName("fk_dam_lakes_created_by");

        //     entity.HasOne(d => d.OrganizationCodeNavigation).WithMany(p => p.DamLakes)
        //         .HasForeignKey(d => d.OrganizationCode)
        //         .HasConstraintName("fk_dam_lakes_organization_code");

        //     entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.DamLakeUpdatedByNavigations)
        //         .HasForeignKey(d => d.UpdatedBy)
        //         .HasConstraintName("fk_dam_lakes_updated_by");
        // });

        modelBuilder.Entity<Device>(entity =>
        {
            entity.HasKey(e => new { e.StationId, e.DeviceId }).HasName("devices_pkey");

            entity.HasIndex(e => e.BrandCode, "idx_devices_brand_code");

            entity.HasIndex(e => e.DeviceId, "idx_devices_device_id");

            entity.HasIndex(e => e.StationId, "idx_devices_station_id");

            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.BrandCode).HasMaxLength(4);
            entity.Property(e => e.NoGsm)
                .HasMaxLength(255)
                .HasDefaultValueSql("NULL::character varying");

            entity.HasOne(d => d.BrandCodeNavigation).WithMany(p => p.Devices)
                .HasForeignKey(d => d.BrandCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_devices_brand_code");

            entity.HasOne(d => d.Station).WithMany(p => p.Devices)
                .HasForeignKey(d => d.StationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_devices_station_id");
        });

        modelBuilder.Entity<District>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("districts_pkey");

            entity.HasIndex(e => e.RegencyId, "idx_districts_regency_id");

            entity.Property(e => e.Id)
                .HasMaxLength(7)
                .IsFixedLength();
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.Latitude).HasMaxLength(255);
            entity.Property(e => e.Longitude).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.RegencyId)
                .HasMaxLength(4)
                .IsFixedLength();
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");

            entity.HasOne(d => d.Regency).WithMany(p => p.Districts)
                .HasForeignKey(d => d.RegencyId)
                .HasConstraintName("fk_districts_regency_id");
        });

        modelBuilder.Entity<LogImportDatum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("LogImportData_pkey");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp without time zone");
            entity.Property(e => e.DeviceId).HasMaxLength(10);
            entity.Property(e => e.ImportedBy).HasMaxLength(255);
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.Periode).HasMaxLength(10);
        });

        modelBuilder.Entity<LogImportMonth>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("LogImportData_copy1_pkey");

            entity.ToTable("LogImportMonth");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.DeviceId).HasMaxLength(10);
            entity.Property(e => e.ImportedMonth).HasMaxLength(7);
            entity.Property(e => e.LastImportDate)
                .HasMaxLength(255)
                .HasColumnName("lastImportDate");
            entity.Property(e => e.StationType).HasMaxLength(255);
            entity.Property(e => e.Status).HasMaxLength(255);
            entity.Property(e => e.SubDomain).HasMaxLength(255);
        });

        modelBuilder.Entity<MvArrLastReading>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("MvArrLastReadings");

            entity.Property(e => e.BrandCode).HasMaxLength(4);
            entity.Property(e => e.BrandName).HasMaxLength(255);
            entity.Property(e => e.BuiltBy).HasMaxLength(100);
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.DistrictId)
                .HasMaxLength(7)
                .IsFixedLength();
            entity.Property(e => e.DistrictName).HasMaxLength(255);
            entity.Property(e => e.IntensityLastDay).HasMaxLength(255);
            entity.Property(e => e.IntensityLastHour).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.NoGsm).HasMaxLength(255);
            entity.Property(e => e.NoRegister).HasMaxLength(255);
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.Photo).HasMaxLength(255);
            entity.Property(e => e.ProvinceId)
                .HasMaxLength(2)
                .IsFixedLength();
            entity.Property(e => e.ProvinceName).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.RegencyId)
                .HasMaxLength(4)
                .IsFixedLength();
            entity.Property(e => e.RegencyName).HasMaxLength(255);
            entity.Property(e => e.RenovationBy).HasMaxLength(100);
            entity.Property(e => e.RiverAreaCode).HasMaxLength(255);
            entity.Property(e => e.RiverAreaName).HasMaxLength(255);
            entity.Property(e => e.TimeZone).HasMaxLength(4);
            entity.Property(e => e.Type).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.VillageId).HasMaxLength(255);
            entity.Property(e => e.VillageName).HasMaxLength(255);
            entity.Property(e => e.WatershedCode).HasMaxLength(50);
            entity.Property(e => e.WatershedName).HasMaxLength(255);
        });

        modelBuilder.Entity<MvAwlrArrLastReading>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("MvAwlrArrLastReadings");

            entity.Property(e => e.BrandCode).HasMaxLength(4);
            entity.Property(e => e.BrandName).HasMaxLength(255);
            entity.Property(e => e.BuiltBy).HasMaxLength(100);
            entity.Property(e => e.ChangeStatus).HasMaxLength(255);
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.DistrictId)
                .HasMaxLength(7)
                .IsFixedLength();
            entity.Property(e => e.DistrictName).HasMaxLength(255);
            entity.Property(e => e.IntensityLastDay).HasMaxLength(255);
            entity.Property(e => e.IntensityLastHour).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.NoGsm).HasMaxLength(255);
            entity.Property(e => e.NoRegister).HasMaxLength(255);
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.Photo).HasMaxLength(255);
            entity.Property(e => e.ProvinceId)
                .HasMaxLength(2)
                .IsFixedLength();
            entity.Property(e => e.ProvinceName).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.RegencyId)
                .HasMaxLength(4)
                .IsFixedLength();
            entity.Property(e => e.RegencyName).HasMaxLength(255);
            entity.Property(e => e.RenovationBy).HasMaxLength(100);
            entity.Property(e => e.RiverAreaCode).HasMaxLength(255);
            entity.Property(e => e.RiverAreaName).HasMaxLength(255);
            entity.Property(e => e.TimeZone).HasMaxLength(4);
            entity.Property(e => e.Type).HasMaxLength(255);
            entity.Property(e => e.UnitDisplay).HasMaxLength(255);
            entity.Property(e => e.UnitSensor).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.VillageId).HasMaxLength(255);
            entity.Property(e => e.VillageName).HasMaxLength(255);
            entity.Property(e => e.WarningStatus).HasMaxLength(255);
            entity.Property(e => e.WatershedCode).HasMaxLength(50);
            entity.Property(e => e.WatershedName).HasMaxLength(255);
        });

        modelBuilder.Entity<MvAwlrLastReading>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("MvAwlrLastReadings");

            entity.Property(e => e.BrandCode).HasMaxLength(4);
            entity.Property(e => e.BrandName).HasMaxLength(255);
            entity.Property(e => e.BuiltBy).HasMaxLength(100);
            entity.Property(e => e.ChangeStatus).HasMaxLength(255);
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.DistrictId)
                .HasMaxLength(7)
                .IsFixedLength();
            entity.Property(e => e.DistrictName).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.NoGsm).HasMaxLength(255);
            entity.Property(e => e.NoRegister).HasMaxLength(255);
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.Photo).HasMaxLength(255);
            entity.Property(e => e.ProvinceId)
                .HasMaxLength(2)
                .IsFixedLength();
            entity.Property(e => e.ProvinceName).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.RegencyId)
                .HasMaxLength(4)
                .IsFixedLength();
            entity.Property(e => e.RegencyName).HasMaxLength(255);
            entity.Property(e => e.RenovationBy).HasMaxLength(100);
            entity.Property(e => e.RiverAreaCode).HasMaxLength(255);
            entity.Property(e => e.RiverAreaName).HasMaxLength(255);
            entity.Property(e => e.TimeZone).HasMaxLength(4);
            entity.Property(e => e.Type).HasMaxLength(255);
            entity.Property(e => e.UnitDisplay).HasMaxLength(255);
            entity.Property(e => e.UnitSensor).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.VillageId).HasMaxLength(255);
            entity.Property(e => e.VillageName).HasMaxLength(255);
            entity.Property(e => e.WarningStatus).HasMaxLength(255);
            entity.Property(e => e.WatershedCode).HasMaxLength(50);
            entity.Property(e => e.WatershedName).HasMaxLength(255);
        });

        modelBuilder.Entity<MvAwsLastReading>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("MvAwsLastReadings");

            entity.Property(e => e.BrandCode).HasMaxLength(4);
            entity.Property(e => e.BrandName).HasMaxLength(255);
            entity.Property(e => e.BuiltBy).HasMaxLength(100);
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.DistrictId)
                .HasMaxLength(7)
                .IsFixedLength();
            entity.Property(e => e.DistrictName).HasMaxLength(255);
            entity.Property(e => e.HumidityStatus).HasMaxLength(50);
            entity.Property(e => e.IntensityLastDay).HasMaxLength(255);
            entity.Property(e => e.IntensityLastHour).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.NoGsm).HasMaxLength(255);
            entity.Property(e => e.NoRegister).HasMaxLength(255);
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.Photo).HasMaxLength(255);
            entity.Property(e => e.ProvinceId)
                .HasMaxLength(2)
                .IsFixedLength();
            entity.Property(e => e.ProvinceName).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.RegencyId)
                .HasMaxLength(4)
                .IsFixedLength();
            entity.Property(e => e.RegencyName).HasMaxLength(255);
            entity.Property(e => e.RenovationBy).HasMaxLength(100);
            entity.Property(e => e.RiverAreaCode).HasMaxLength(255);
            entity.Property(e => e.RiverAreaName).HasMaxLength(255);
            entity.Property(e => e.TimeZone).HasMaxLength(4);
            entity.Property(e => e.Type).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.VillageId).HasMaxLength(255);
            entity.Property(e => e.VillageName).HasMaxLength(255);
            entity.Property(e => e.WatershedCode).HasMaxLength(50);
            entity.Property(e => e.WatershedName).HasMaxLength(255);
            entity.Property(e => e.WindDirectionStatus).HasMaxLength(50);
        });

        modelBuilder.Entity<MvDevice>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("MvDevices");

            entity.Property(e => e.BrandCode).HasMaxLength(4);
            entity.Property(e => e.BrandJobName).HasMaxLength(255);
            entity.Property(e => e.BrandName).HasMaxLength(255);
            entity.Property(e => e.BrandPassword).HasMaxLength(255);
            entity.Property(e => e.BrandUrl).HasMaxLength(255);
            entity.Property(e => e.BrandUsername).HasMaxLength(255);
            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.NoGsm).HasMaxLength(255);
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.OrganizationName).HasMaxLength(255);
            entity.Property(e => e.StationName).HasMaxLength(255);
            entity.Property(e => e.StationType).HasMaxLength(255);
            entity.Property(e => e.SubDomain).HasMaxLength(150);
            entity.Property(e => e.SubDomainOld).HasMaxLength(150);
            entity.Property(e => e.TimeZone).HasMaxLength(4);
            entity.Property(e => e.UnitDisplay).HasMaxLength(255);
            entity.Property(e => e.UnitSensor).HasMaxLength(255);
        });

        modelBuilder.Entity<MvPiezometerLastReading>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("MvPiezometerLastReadings");

            entity.Property(e => e.BrandCode).HasMaxLength(4);
            entity.Property(e => e.BrandName).HasMaxLength(255);
            entity.Property(e => e.BuiltBy).HasMaxLength(100);
            entity.Property(e => e.ChangeStatus).HasMaxLength(255);
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.DistrictId)
                .HasMaxLength(7)
                .IsFixedLength();
            entity.Property(e => e.DistrictName).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.NoGsm).HasMaxLength(255);
            entity.Property(e => e.NoRegister).HasMaxLength(255);
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.Photo).HasMaxLength(255);
            entity.Property(e => e.ProvinceId)
                .HasMaxLength(2)
                .IsFixedLength();
            entity.Property(e => e.ProvinceName).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.RegencyId)
                .HasMaxLength(4)
                .IsFixedLength();
            entity.Property(e => e.RegencyName).HasMaxLength(255);
            entity.Property(e => e.RenovationBy).HasMaxLength(100);
            entity.Property(e => e.RiverAreaCode).HasMaxLength(255);
            entity.Property(e => e.RiverAreaName).HasMaxLength(255);
            entity.Property(e => e.TimeZone).HasMaxLength(4);
            entity.Property(e => e.Type).HasMaxLength(255);
            entity.Property(e => e.UnitDisplay).HasMaxLength(255);
            entity.Property(e => e.UnitSensor).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.VillageId).HasMaxLength(255);
            entity.Property(e => e.VillageName).HasMaxLength(255);
            entity.Property(e => e.WatershedCode).HasMaxLength(50);
            entity.Property(e => e.WatershedName).HasMaxLength(255);
        });

        modelBuilder.Entity<MvStation>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("MvStations");

            entity.Property(e => e.BrandCode).HasMaxLength(4);
            entity.Property(e => e.BrandName).HasMaxLength(255);
            entity.Property(e => e.BuiltBy).HasMaxLength(100);
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.DistrictId)
                .HasMaxLength(7)
                .IsFixedLength();
            entity.Property(e => e.DistrictName).HasMaxLength(255);
            entity.Property(e => e.LastReadingAt).HasColumnType("timestamp without time zone");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.NoGsm).HasMaxLength(255);
            entity.Property(e => e.NoRegister).HasMaxLength(255);
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.Photo).HasMaxLength(255);
            entity.Property(e => e.ProvinceId)
                .HasMaxLength(2)
                .IsFixedLength();
            entity.Property(e => e.ProvinceName).HasMaxLength(255);
            entity.Property(e => e.RegencyId)
                .HasMaxLength(4)
                .IsFixedLength();
            entity.Property(e => e.RegencyName).HasMaxLength(255);
            entity.Property(e => e.RenovationBy).HasMaxLength(100);
            entity.Property(e => e.RiverAreaName).HasMaxLength(255);
            entity.Property(e => e.TimeZone).HasMaxLength(4);
            entity.Property(e => e.Type).HasMaxLength(255);
            entity.Property(e => e.UnitDisplay).HasMaxLength(255);
            entity.Property(e => e.UnitDisplayPiezo).HasMaxLength(255);
            entity.Property(e => e.UnitSensor).HasMaxLength(255);
            entity.Property(e => e.UnitSensorPiezo).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.VillageId).HasMaxLength(255);
            entity.Property(e => e.VillageName).HasMaxLength(255);
            entity.Property(e => e.WatershedName).HasMaxLength(255);
        });

        modelBuilder.Entity<MvVnotchLastReading>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("MvVnotchLastReadings");

            entity.Property(e => e.BrandCode).HasMaxLength(4);
            entity.Property(e => e.BrandName).HasMaxLength(255);
            entity.Property(e => e.BuiltBy).HasMaxLength(100);
            entity.Property(e => e.ChangeStatus).HasMaxLength(255);
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.DistrictId)
                .HasMaxLength(7)
                .IsFixedLength();
            entity.Property(e => e.DistrictName).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.NoGsm).HasMaxLength(255);
            entity.Property(e => e.NoRegister).HasMaxLength(255);
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.Photo).HasMaxLength(255);
            entity.Property(e => e.ProvinceId)
                .HasMaxLength(2)
                .IsFixedLength();
            entity.Property(e => e.ProvinceName).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.RegencyId)
                .HasMaxLength(4)
                .IsFixedLength();
            entity.Property(e => e.RegencyName).HasMaxLength(255);
            entity.Property(e => e.RenovationBy).HasMaxLength(100);
            entity.Property(e => e.RiverAreaCode).HasMaxLength(255);
            entity.Property(e => e.RiverAreaName).HasMaxLength(255);
            entity.Property(e => e.TimeZone).HasMaxLength(4);
            entity.Property(e => e.Type).HasMaxLength(255);
            entity.Property(e => e.UnitDebit).HasMaxLength(255);
            entity.Property(e => e.UnitDisplay).HasMaxLength(255);
            entity.Property(e => e.UnitSensor).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.VillageId).HasMaxLength(255);
            entity.Property(e => e.VillageName).HasMaxLength(255);
            entity.Property(e => e.WatershedCode).HasMaxLength(50);
            entity.Property(e => e.WatershedName).HasMaxLength(255);
        });

        modelBuilder.Entity<MvWqmsLastReading>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("MvWqmsLastReadings");

            entity.Property(e => e.BrandCode).HasMaxLength(4);
            entity.Property(e => e.BrandName).HasMaxLength(255);
            entity.Property(e => e.BuiltBy).HasMaxLength(100);
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.DistrictId)
                .HasMaxLength(7)
                .IsFixedLength();
            entity.Property(e => e.DistrictName).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.NoGsm).HasMaxLength(255);
            entity.Property(e => e.NoRegister).HasMaxLength(255);
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.Photo).HasMaxLength(255);
            entity.Property(e => e.ProvinceId)
                .HasMaxLength(2)
                .IsFixedLength();
            entity.Property(e => e.ProvinceName).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.RegencyId)
                .HasMaxLength(4)
                .IsFixedLength();
            entity.Property(e => e.RegencyName).HasMaxLength(255);
            entity.Property(e => e.RenovationBy).HasMaxLength(100);
            entity.Property(e => e.RiverAreaCode).HasMaxLength(255);
            entity.Property(e => e.RiverAreaName).HasMaxLength(255);
            entity.Property(e => e.TimeZone).HasMaxLength(4);
            entity.Property(e => e.Type).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.VillageId).HasMaxLength(255);
            entity.Property(e => e.VillageName).HasMaxLength(255);
            entity.Property(e => e.WatershedCode).HasMaxLength(50);
            entity.Property(e => e.WatershedName).HasMaxLength(255);
        });

        modelBuilder.Entity<Organization>(entity =>
        {
            entity.HasKey(e => e.Code).HasName("Organizations_pkey");

            entity.HasIndex(e => e.Code, "idx_organizations_code");

            entity.HasIndex(e => e.SubDomain, "idx_organizations_sub_domain");

            entity.Property(e => e.Code).HasMaxLength(10);
            entity.Property(e => e.Category).HasMaxLength(255);
            entity.Property(e => e.Favicon).HasMaxLength(255);
            entity.Property(e => e.HomeTemplate).HasMaxLength(255);
            entity.Property(e => e.Logo).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.ShpFileArea)
                .HasMaxLength(255)
                .HasDefaultValueSql("NULL::character varying");
            entity.Property(e => e.SubDomain).HasMaxLength(150);
            entity.Property(e => e.SubDomainOld)
                .HasMaxLength(150)
                .HasDefaultValueSql("NULL::character varying");
            entity.Property(e => e.TextFooter).HasMaxLength(255);
            entity.Property(e => e.TextLogo1).HasMaxLength(255);
            entity.Property(e => e.TextLogo2).HasMaxLength(255);
            entity.Property(e => e.TextLogo3).HasMaxLength(255);
            entity.Property(e => e.Timezone1).HasMaxLength(4);
            entity.Property(e => e.Timezone2)
                .HasMaxLength(4)
                .HasDefaultValueSql("NULL::bpchar");
            entity.Property(e => e.Type).HasMaxLength(255);
        });

        modelBuilder.Entity<OrganizationHasBrand>(entity =>
        {
            entity.HasKey(e => new { e.OrganizationCode, e.BrandCode }).HasName("OrganizationHasBrands_pkey");

            entity.HasIndex(e => e.BrandCode, "idx_organization_has_brand_apis_brand_code");

            entity.HasIndex(e => e.OrganizationCode, "idx_organization_has_brand_apis_organization_code");

            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.BrandCode).HasMaxLength(4);
            entity.Property(e => e.IsBasicAuth).HasDefaultValue(false);
            entity.Property(e => e.JobName)
                .HasMaxLength(255)
                .HasDefaultValueSql("NULL::character varying");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasDefaultValueSql("NULL::character varying");
            entity.Property(e => e.Url).HasMaxLength(255);
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasDefaultValueSql("NULL::character varying");

            entity.HasOne(d => d.BrandCodeNavigation).WithMany(p => p.OrganizationHasBrands)
                .HasForeignKey(d => d.BrandCode)
                .HasConstraintName("fk_organization_has_brand_apis_brand_code");

            entity.HasOne(d => d.OrganizationCodeNavigation).WithMany(p => p.OrganizationHasBrands)
                .HasForeignKey(d => d.OrganizationCode)
                .HasConstraintName("fk_organization_has_brand_apis_organization_code");
        });

        modelBuilder.Entity<OrganizationHasProvince>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("OrganizationHasUsers_copy1_pkey");

            entity.HasIndex(e => e.OrganizationCode, "idx_organization_has_provinces_organization_code");

            entity.HasIndex(e => e.ProvinceId, "idx_organization_has_provinces_province_id");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.ProvinceId)
                .HasMaxLength(2)
                .IsFixedLength();

            entity.HasOne(d => d.OrganizationCodeNavigation).WithMany(p => p.OrganizationHasProvinces)
                .HasForeignKey(d => d.OrganizationCode)
                .HasConstraintName("fk_OrganizationHasProvinces_OrganizationCode");

            entity.HasOne(d => d.Province).WithMany(p => p.OrganizationHasProvinces)
                .HasForeignKey(d => d.ProvinceId)
                .HasConstraintName("fk_OrganizationHasProvinces_ProvinceId");
        });

        // modelBuilder.Entity<OrganizationHasUser>(entity =>
        // {
        //     entity.HasKey(e => e.Id).HasName("OrganizationHasUsers_pkey");

        //     entity.HasIndex(e => e.OrganizationCode, "idx_organization_has_users_organization_code");

        //     entity.HasIndex(e => e.UserId, "idx_organization_has_users_user_id");

        //     entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
        //     entity.Property(e => e.OrganizationCode).HasMaxLength(10);

        //     entity.HasOne(d => d.OrganizationCodeNavigation).WithMany(p => p.OrganizationHasUsers)
        //         .HasForeignKey(d => d.OrganizationCode)
        //         .HasConstraintName("fk_organization_has_users_organization_code");

        //     entity.HasOne(d => d.User).WithMany(p => p.OrganizationHasUsers)
        //         .HasForeignKey(d => d.UserId)
        //         .HasConstraintName("fk_organization_has_users_user_id");
        // });

        modelBuilder.Entity<OrganizationSchema>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("OrganizationSchemas_pkey");

            entity.HasIndex(e => e.SchemaName, "idx_organization_schema_name");

            entity.HasIndex(e => e.OrganizationCode, "idx_organization_schemas_org_code");

            entity.HasIndex(e => e.SchemaFile, "idx_organization_schemas_schema_file");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.SchemaFile)
                .HasMaxLength(255)
                .HasDefaultValueSql("NULL::character varying");
            entity.Property(e => e.SchemaName)
                .HasMaxLength(255)
                .HasDefaultValueSql("NULL::character varying");

            entity.HasOne(d => d.OrganizationCodeNavigation).WithMany(p => p.OrganizationSchemas)
                .HasForeignKey(d => d.OrganizationCode)
                .HasConstraintName("fk_organization_schemas_organization_code");
        });

        modelBuilder.Entity<PgbenchAccount>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("pgbench_accounts")
                .HasAnnotation("Npgsql:StorageParameter:fillfactor", "100");

            entity.Property(e => e.Abalance).HasColumnName("abalance");
            entity.Property(e => e.Aid).HasColumnName("aid");
            entity.Property(e => e.Bid).HasColumnName("bid");
            entity.Property(e => e.Filler)
                .HasMaxLength(84)
                .IsFixedLength()
                .HasColumnName("filler");
        });

        modelBuilder.Entity<PgbenchBranch>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("pgbench_branches")
                .HasAnnotation("Npgsql:StorageParameter:fillfactor", "100");

            entity.Property(e => e.Bbalance).HasColumnName("bbalance");
            entity.Property(e => e.Bid).HasColumnName("bid");
            entity.Property(e => e.Filler)
                .HasMaxLength(88)
                .IsFixedLength()
                .HasColumnName("filler");
        });

        modelBuilder.Entity<PgbenchHistory>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("pgbench_history");

            entity.Property(e => e.Aid).HasColumnName("aid");
            entity.Property(e => e.Bid).HasColumnName("bid");
            entity.Property(e => e.Delta).HasColumnName("delta");
            entity.Property(e => e.Filler)
                .HasMaxLength(22)
                .IsFixedLength()
                .HasColumnName("filler");
            entity.Property(e => e.Mtime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("mtime");
            entity.Property(e => e.Tid).HasColumnName("tid");
        });

        modelBuilder.Entity<PgbenchTeller>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("pgbench_tellers")
                .HasAnnotation("Npgsql:StorageParameter:fillfactor", "100");

            entity.Property(e => e.Bid).HasColumnName("bid");
            entity.Property(e => e.Filler)
                .HasMaxLength(84)
                .IsFixedLength()
                .HasColumnName("filler");
            entity.Property(e => e.Tbalance).HasColumnName("tbalance");
            entity.Property(e => e.Tid).HasColumnName("tid");
        });

        modelBuilder.Entity<PiezometerLastReading>(entity =>
        {
            entity.HasKey(e => new { e.StationId, e.DeviceId }).HasName("Piezometer_last_readings_pkey");

            entity.HasIndex(e => e.DeviceId, "idx_Piezometer_last_readings_device_id");

            entity.HasIndex(e => e.ReadingAt, "idx_Piezometer_last_readings_reading_at");

            entity.HasIndex(e => e.StationId, "idx_Piezometer_last_readings_station_id");

            entity.HasIndex(e => e.WaterLevel, "idx_Piezometer_last_readings_water_level");

            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.ChangeStatus).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");

            entity.HasOne(d => d.Device).WithOne(p => p.PiezometerLastReading)
                .HasForeignKey<PiezometerLastReading>(d => new { d.StationId, d.DeviceId })
                .HasConstraintName("fk_Piezometer_last_readings_device");
        });

        modelBuilder.Entity<PiezometerSetting>(entity =>
        {
            entity.HasKey(e => new { e.StationId, e.DeviceId }).HasName("Piezometer_settings_pkey");

            entity.HasIndex(e => e.DeviceId, "idx_Piezometer_settings_device_id");

            entity.HasIndex(e => e.StationId, "idx_Piezometer_settings_station_id");

            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.UnitDisplay).HasMaxLength(255);
            entity.Property(e => e.UnitSensor).HasMaxLength(255);

            entity.HasOne(d => d.Device).WithOne(p => p.PiezometerSetting)
                .HasForeignKey<PiezometerSetting>(d => new { d.StationId, d.DeviceId })
                .HasConstraintName("Piezometer_settings_device_foreign");
        });

        modelBuilder.Entity<Province>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("provinces_pkey");

            entity.Property(e => e.Id)
                .HasMaxLength(2)
                .IsFixedLength();
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.Latitude).HasMaxLength(255);
            entity.Property(e => e.Longitude).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");
        });

        modelBuilder.Entity<Regency>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("regencies_pkey");

            entity.HasIndex(e => e.ProvinceId, "idx_regencies_province_id");

            entity.Property(e => e.Id)
                .HasMaxLength(4)
                .IsFixedLength();
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.Latitude).HasMaxLength(255);
            entity.Property(e => e.Longitude).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.ProvinceId)
                .HasMaxLength(2)
                .IsFixedLength();
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");

            entity.HasOne(d => d.Province).WithMany(p => p.Regencies)
                .HasForeignKey(d => d.ProvinceId)
                .HasConstraintName("fk_regencies_province_id");
        });

        // modelBuilder.Entity<RiverArea>(entity =>
        // {
        //     entity.HasKey(e => e.Id).HasName("RiverAreas_pkey");

        //     entity.HasIndex(e => e.Code, "idx_river_areas_code");

        //     entity.HasIndex(e => e.Name, "idx_river_areas_name");

        //     entity.HasIndex(e => e.OrganizationCode, "idx_river_areas_organization_code");

        //     entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
        //     entity.Property(e => e.Code).HasMaxLength(255);
        //     entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
        //     entity.Property(e => e.Name).HasMaxLength(255);
        //     entity.Property(e => e.OrganizationCode).HasMaxLength(10);
        //     entity.Property(e => e.ShpFile)
        //         .HasMaxLength(255)
        //         .HasDefaultValueSql("NULL::character varying");
        //     entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");

        //     entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RiverAreaCreatedByNavigations)
        //         .HasForeignKey(d => d.CreatedBy)
        //         .OnDelete(DeleteBehavior.ClientSetNull)
        //         .HasConstraintName("fk_river_areas_created_by");

        //     entity.HasOne(d => d.OrganizationCodeNavigation).WithMany(p => p.RiverAreas)
        //         .HasForeignKey(d => d.OrganizationCode)
        //         .HasConstraintName("fk_river_areas_organization_code");

        //     entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.RiverAreaUpdatedByNavigations)
        //         .HasForeignKey(d => d.UpdatedBy)
        //         .HasConstraintName("fk_river_areas_updated_by");
        // });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Code).HasName("Roles_pkey");

            entity.HasIndex(e => e.Code, "idx_roles_code");

            entity.Property(e => e.Code).HasMaxLength(4);
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<SchemaList>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("SchemaLists_pkey");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.Das).HasMaxLength(255);
            entity.Property(e => e.Desa).HasMaxLength(255);
            entity.Property(e => e.ECoordinat)
                .HasMaxLength(255)
                .HasColumnName("E_coordinat");
            entity.Property(e => e.Jenis).HasMaxLength(255);
            entity.Property(e => e.Kab).HasMaxLength(255);
            entity.Property(e => e.Kec).HasMaxLength(255);
            entity.Property(e => e.Keterangan).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Nopos).HasMaxLength(255);
            entity.Property(e => e.OrganizationCode).HasMaxLength(255);
            entity.Property(e => e.SCoordinat)
                .HasMaxLength(255)
                .HasColumnName("S_coordinat");
            entity.Property(e => e.Sungai).HasMaxLength(255);
            entity.Property(e => e.Ws).HasMaxLength(255);
        });

        modelBuilder.Entity<Station>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Stations_pkey");

            entity.HasIndex(e => e.DistrictId, "idx_stations_district_id");

            entity.HasIndex(e => e.Name, "idx_stations_name");

            entity.HasIndex(e => e.OrganizationCode, "idx_stations_organization_code");

            entity.HasIndex(e => e.ProvinceId, "idx_stations_province_id");

            entity.HasIndex(e => e.RegencyId, "idx_stations_regency_id");

            entity.HasIndex(e => e.RiverAreaId, "idx_stations_river_area_id");

            entity.HasIndex(e => e.Type, "idx_stations_type");

            entity.HasIndex(e => e.VillageId, "idx_stations_village_id");

            entity.HasIndex(e => e.WatershedId, "idx_stations_watershed_id");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.BuiltBy)
                .HasMaxLength(100)
                .HasDefaultValueSql("NULL::character varying");
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DistrictId)
                .HasMaxLength(7)
                .HasDefaultValueSql("NULL::bpchar")
                .IsFixedLength();
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.NoRegister)
                .HasMaxLength(255)
                .HasDefaultValueSql("NULL::character varying");
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.Photo)
                .HasMaxLength(255)
                .HasDefaultValueSql("NULL::character varying");
            entity.Property(e => e.ProvinceId)
                .HasMaxLength(2)
                .HasDefaultValueSql("NULL::bpchar")
                .IsFixedLength();
            entity.Property(e => e.RegencyId)
                .HasMaxLength(4)
                .HasDefaultValueSql("NULL::bpchar")
                .IsFixedLength();
            entity.Property(e => e.RenovationBy)
                .HasMaxLength(100)
                .HasDefaultValueSql("NULL::character varying");
            entity.Property(e => e.TimeZone).HasMaxLength(4);
            entity.Property(e => e.Type).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.VillageId)
                .HasMaxLength(255)
                .HasDefaultValueSql("NULL::character varying");

            entity.HasOne(d => d.District).WithMany(p => p.Stations)
                .HasForeignKey(d => d.DistrictId)
                .HasConstraintName("fk_stations_district_id");

            entity.HasOne(d => d.OrganizationCodeNavigation).WithMany(p => p.Stations)
                .HasForeignKey(d => d.OrganizationCode)
                .HasConstraintName("fk_stations_organization_code");

            entity.HasOne(d => d.Province).WithMany(p => p.Stations)
                .HasForeignKey(d => d.ProvinceId)
                .HasConstraintName("fk_stations_province_id");

            entity.HasOne(d => d.Regency).WithMany(p => p.Stations)
                .HasForeignKey(d => d.RegencyId)
                .HasConstraintName("fk_stations_regency_id");

            entity.HasOne(d => d.RiverArea).WithMany(p => p.Stations)
                .HasForeignKey(d => d.RiverAreaId)
                .HasConstraintName("fk_stations_river_area_id");

            entity.HasOne(d => d.Village).WithMany(p => p.Stations)
                .HasForeignKey(d => d.VillageId)
                .HasConstraintName("fk_stations_village_id");

            entity.HasOne(d => d.Watershed).WithMany(p => p.Stations)
                .HasForeignKey(d => d.WatershedId)
                .HasConstraintName("fk_stations_watershed_id");
        });

        modelBuilder.Entity<StationSchema>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("StationSchemas_pkey");

            entity.HasIndex(e => e.OrganizationSchemaId, "idx_station_schemas_org_schema_id");

            entity.HasIndex(e => e.StationId, "idx_station_schemas_station_id");

            entity.Property(e => e.Id).HasDefaultValueSql("uuid_generate_v4()");
            entity.Property(e => e.Color).HasMaxLength(255);
            entity.Property(e => e.KoordinatE).HasMaxLength(255);
            entity.Property(e => e.KoordinatS).HasMaxLength(255);
            entity.Property(e => e.No).HasMaxLength(255);
            entity.Property(e => e.Type).HasMaxLength(255);
            entity.Property(e => e.TypeElement).HasMaxLength(255);

            entity.HasOne(d => d.OrganizationSchema).WithMany(p => p.StationSchemas)
                .HasForeignKey(d => d.OrganizationSchemaId)
                .HasConstraintName("fk_station_schemas_organization_schema_id");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Users_pkey");

            entity.ToTable("users");

            entity.HasIndex(e => e.Id, "idx_users_id");

            entity.HasIndex(e => e.Phone, "idx_users_phone");

            entity.HasIndex(e => e.Username, "idx_users_username");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("timestamp(0) without time zone")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.DeletedAt)
                .HasDefaultValueSql("NULL::timestamp without time zone")
                .HasColumnType("timestamp(0) without time zone")
                .HasColumnName("deleted_at");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasDefaultValueSql("NULL::character varying")
                .HasColumnName("email");
            entity.Property(e => e.LastLogin)
                .HasDefaultValueSql("NULL::timestamp without time zone")
                .HasColumnType("timestamp(0) without time zone")
                .HasColumnName("last_login");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .HasDefaultValueSql("NULL::character varying")
                .HasColumnName("phone");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("NULL::timestamp without time zone")
                .HasColumnType("timestamp(0) without time zone")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasDefaultValueSql("NULL::character varying")
                .HasColumnName("username");
        });

        modelBuilder.Entity<Village>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("villages_pkey");

            entity.HasIndex(e => e.DistrictId, "idx_villages_district_id");

            entity.Property(e => e.Id).HasMaxLength(255);
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DeletedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.DistrictId)
                .HasMaxLength(7)
                .IsFixedLength();
            entity.Property(e => e.Latitude).HasMaxLength(255);
            entity.Property(e => e.Longitude).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasColumnType("timestamp(0) without time zone");

            entity.HasOne(d => d.District).WithMany(p => p.Villages)
                .HasForeignKey(d => d.DistrictId)
                .HasConstraintName("fk_villages_district_id");
        });

        modelBuilder.Entity<VnotchLastReading>(entity =>
        {
            entity.HasKey(e => new { e.StationId, e.DeviceId }).HasName("vnotch_last_readings_pkey");

            entity.ToTable("VNotchLastReadings");

            entity.HasIndex(e => e.Debit, "idx_vnotch_last_readings_debit");

            entity.HasIndex(e => e.DeviceId, "idx_vnotch_last_readings_device_id");

            entity.HasIndex(e => e.ReadingAt, "idx_vnotch_last_readings_reading_at");

            entity.HasIndex(e => e.StationId, "idx_vnotch_last_readings_station_id");

            entity.HasIndex(e => e.WaterLevel, "idx_vnotch_last_readings_water_level");

            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.ChangeStatus).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");

            entity.HasOne(d => d.Device).WithOne(p => p.VnotchLastReading)
                .HasForeignKey<VnotchLastReading>(d => new { d.StationId, d.DeviceId })
                .HasConstraintName("fk_vnotch_last_readings_device");
        });

        modelBuilder.Entity<VnotchSetting>(entity =>
        {
            entity.HasKey(e => new { e.StationId, e.DeviceId }).HasName("vnotch_settings_pkey");

            entity.ToTable("VNotchSettings");

            entity.HasIndex(e => e.DeviceId, "idx_vnotch_settings_device_id");

            entity.HasIndex(e => e.StationId, "idx_vnotch_settings_station_id");

            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.UnitDebit)
                .HasMaxLength(255)
                .HasDefaultValueSql("NULL::character varying");
            entity.Property(e => e.UnitDisplay).HasMaxLength(255);
            entity.Property(e => e.UnitSensor).HasMaxLength(255);

            entity.HasOne(d => d.Device).WithOne(p => p.VnotchSetting)
                .HasForeignKey<VnotchSetting>(d => new { d.StationId, d.DeviceId })
                .HasConstraintName("vnotch_settings_device_foreign");
        });

        modelBuilder.Entity<WhatsAppRecipient>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("WhatsAppRecipients_pkey");

            entity.HasIndex(e => e.OrganizationCode, "idx_whatsapp_recipients_organization_code");

            entity.HasIndex(e => e.RecipientIdentifier, "idx_whatsapp_recipients_recipient_identifier");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedAt).HasColumnType("timestamp(0) without time zone");
            entity.Property(e => e.OrganizationCode).HasMaxLength(10);
            entity.Property(e => e.RecipientIdentifier).HasMaxLength(255);
            entity.Property(e => e.RecipientName).HasMaxLength(255);
            entity.Property(e => e.RecipientType).HasMaxLength(255);

            entity.HasOne(d => d.OrganizationCodeNavigation).WithMany(p => p.WhatsAppRecipients)
                .HasForeignKey(d => d.OrganizationCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_whatsapp_recipients_organization_code");
        });

        modelBuilder.Entity<WqmsLastReading>(entity =>
        {
            entity.HasKey(e => new { e.StationId, e.DeviceId }).HasName("wqms_last_readings_pkey");

            entity.HasIndex(e => e.Battery, "idx_wqms_last_readings_battery");

            entity.HasIndex(e => e.DeviceId, "idx_wqms_last_readings_device_id");

            entity.HasIndex(e => e.Orp, "idx_wqms_last_readings_orp");

            entity.HasIndex(e => e.Ph, "idx_wqms_last_readings_ph");

            entity.HasIndex(e => e.ReadingAt, "idx_wqms_last_readings_reading_at");

            entity.HasIndex(e => e.StationId, "idx_wqms_last_readings_station_id");

            entity.HasIndex(e => e.Temperature, "idx_wqms_last_readings_temperature");

            entity.HasIndex(e => e.Turbidity, "idx_wqms_last_readings_turbidity");

            entity.Property(e => e.DeviceId).HasMaxLength(255);
            entity.Property(e => e.ReadingAt).HasColumnType("timestamp(0) without time zone");

            entity.HasOne(d => d.Device).WithOne(p => p.WqmsLastReading)
                .HasForeignKey<WqmsLastReading>(d => new { d.StationId, d.DeviceId })
                .HasConstraintName("fk_wqms_last_readings_device");
        });

        modelBuilder.Entity<ForecastKetersediaan>(entity => {
            entity.ToTable("forecast_ketersediaan");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");

            entity.Property(e => e.Time).HasColumnName("time");
            entity.Property(e => e.Bangunan).HasColumnName("bangunan");
            entity.Property(e => e.Debit).HasColumnName("debit");
            entity.Property(e => e.Min).HasColumnName("min");
            entity.Property(e => e.Max).HasColumnName("max");
            entity.Property(e => e.PetakTersier).HasColumnName("petakTersier");
        });

        modelBuilder.Entity<Skema>(entity => {
            entity.ToTable("skema");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");

            entity.Property(e => e.Latitude).HasColumnName("latitude");
            entity.Property(e => e.Longitude).HasColumnName("longitude");
            entity.Property(e => e.IconHeight).HasColumnName("iconHeight");
            entity.Property(e => e.IconWidth).HasColumnName("iconWidth");
            entity.Property(e => e.IconUrl).HasColumnName("iconUrl");
            entity.Property(e => e.Lokasi).HasColumnName("lokasi");
            entity.Property(e => e.Type).HasColumnName("type");
        });

        modelBuilder.Entity<MasterPetak>(entity => {
            entity.ToTable("petak");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");

            entity.Property(e => e.NamaPetak).HasColumnName("nama_petak");
            entity.Property(e => e.JenisBangunan).HasColumnName("jenis_bangunan");
            entity.Property(e => e.Luas).HasColumnType("double precision").HasColumnName("luas");
            // entity.Property(e => e.BangunanId).HasColumnName("bangunan_id");
            entity.Property(e => e.DebitKebutuhan).HasColumnType("double precision").HasColumnName("debit_kebutuhan");
            entity.Property(e => e.Location).HasColumnName("location");
        });


        modelBuilder.Entity<DebitPengambilan>(entity => {
            entity.ToTable("debit_pengambilan");

            entity.Property(e => e.Id).HasColumnName("id");

            entity.Property(e => e.Tanggal).HasColumnType("timestamp(0) without time zone").HasColumnName("tanggal");
            entity.Property(e => e.Satuan).HasColumnName("satuan");
            entity.Property(e => e.Nilai).HasColumnType("double precision").HasColumnName("nilai");
            // entity.Property(e => e.Nilai).HasColumnName("nilai");
            entity.Property(e => e.Update).HasColumnType("timestamp(0) without time zone").HasColumnName("update");
        });

        modelBuilder.Entity<DebitHulu>(entity => {
            entity.ToTable("debit_hulu");

            entity.Property(e => e.Id).HasColumnName("id");

            entity.Property(e => e.Tanggal).HasColumnType("timestamp(0) without time zone").HasColumnName("tanggal");
            entity.Property(e => e.Satuan).HasColumnName("satuan");
            entity.Property(e => e.Nilai).HasColumnType("double precision").HasColumnName("nilai");
            entity.Property(e => e.NilaiCihaur).HasColumnType("double precision").HasColumnName("nilai_cihaur");
            entity.Property(e => e.NilaiSidareja).HasColumnType("double precision").HasColumnName("nilai_sidareja");
            entity.Property(e => e.NilaiLakbok).HasColumnType("double precision").HasColumnName("nilai_lakbok");
            // entity.Property(e => e.Nilai).HasColumnName("nilai");
            entity.Property(e => e.Update).HasColumnType("timestamp(0) without time zone").HasColumnName("update");
        });

        modelBuilder.Entity<Sumur>(entity => {
            entity.ToTable("data_sumur");

        entity.Property(e => e.Id).HasColumnName("id");
        entity.Property(e => e.Code).HasColumnName("code");
        entity.Property(e => e.Alamat).HasColumnName("alamat");
        entity.Property(e => e.SumberEnergi).HasColumnName("sumber_energi");
        entity.Property(e => e.Longitude).HasColumnName("longitude");
        entity.Property(e => e.Latitude).HasColumnName("latitude");
        entity.Property(e => e.TahunPengeboran).HasColumnName("tahun_pengeboran");
        entity.Property(e => e.TahunRehab).HasColumnName("tahun_rehab");
        entity.Property(e => e.TahunPerbaikanJiat).HasColumnName("tahun_perbaikan_jiat");
        entity.Property(e => e.TahunPerbaikanMesin).HasColumnName("tahun_perbaikan_mesin");
        entity.Property(e => e.KedalamanBor).HasColumnName("kedalaman_bor");
        entity.Property(e => e.DebitSumur).HasColumnType("double precision").HasColumnName("debit_sumur");
        entity.Property(e => e.KondisiSumur).HasColumnName("kondisi_sumur");
        entity.Property(e => e.KondisiMesin).HasColumnName("kondisi_mesin");
        entity.Property(e => e.KondisiPompa).HasColumnName("kondisi_pompa");
        entity.Property(e => e.KondisiRumahPompa).HasColumnName("kondisi_rumah_pompa");
        entity.Property(e => e.IrigasiPipaSaluran).HasColumnName("irigasi_pipa_saluran");
        entity.Property(e => e.IrigasiBoxPembagi).HasColumnName("irigasi_box_pembagi");
        entity.Property(e => e.FungsiAirBaku).HasColumnName("fungsi_air_baku");
        entity.Property(e => e.FungsiIrigasi).HasColumnName("fungsi_irigasi");
        entity.Property(e => e.Status).HasColumnName("status");
        entity.Property(e => e.Note).HasColumnName("note");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
