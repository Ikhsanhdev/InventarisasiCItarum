using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class OrganizationHasBrand
{
    public string OrganizationCode { get; set; } = null!;

    public string BrandCode { get; set; } = null!;

    public string Url { get; set; } = null!;

    public bool? IsBasicAuth { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? JobName { get; set; }

    public virtual Brand BrandCodeNavigation { get; set; } = null!;

    public virtual Organization OrganizationCodeNavigation { get; set; } = null!;
}
