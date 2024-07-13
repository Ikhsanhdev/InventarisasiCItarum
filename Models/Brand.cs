using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class Brand
{
    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<Device> Devices { get; set; } = new List<Device>();

    public virtual ICollection<OrganizationHasBrand> OrganizationHasBrands { get; set; } = new List<OrganizationHasBrand>();
}
