using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class OrganizationHasProvince
{
    public Guid Id { get; set; }

    public string OrganizationCode { get; set; } = null!;

    public string ProvinceId { get; set; } = null!;

    public virtual Organization OrganizationCodeNavigation { get; set; } = null!;

    public virtual Province Province { get; set; } = null!;
}
