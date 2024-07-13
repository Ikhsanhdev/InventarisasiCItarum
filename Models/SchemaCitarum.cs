using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class SchemaCitarum
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Jenis { get; set; }

    public string? Ws { get; set; }

    public string? Das { get; set; }

    public string? Sungai { get; set; }

    public string? Desa { get; set; }

    public string? Kec { get; set; }

    public string? Kab { get; set; }

    public string? SCoordinat { get; set; }

    public string? ECoordinat { get; set; }

    public string? Keterangan { get; set; }

    public string? Nopos { get; set; }

    public string? OrganizationCode { get; set; }
}
