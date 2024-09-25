using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class Sumur
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Alamat { get; set; }

    public string? SumberEnergi { get; set; }

    public string? Latitude { get; set; }

    public string? Longitude { get; set; }

    public int? TahunPengeboran { get; set; }

    public int? TahunRehab { get; set; }

    public int? TahunPerbaikanJiat { get; set; }

    public int? TahunPerbaikanMesin { get; set; }

    public int? KedalamanBor { get; set; }

    public double? DebitSumur { get; set; }

    public string? KondisiSumur { get; set; }

    public string? KondisiMesin { get; set; }

    public string? KondisiPompa { get; set; }

    public string? KondisiRumahPompa { get; set; }

    public string? IrigasiPipaSaluran { get; set; }

    public string? IrigasiBoxPembagi { get; set; }

    public int? FungsiAirBaku { get; set; }

    public int? FungsiIrigasi { get; set; }

    public string? Status { get; set; }

    public string? Note { get; set; }




}

