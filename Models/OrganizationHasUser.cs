using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class OrganizationHasUser
{
    public Guid Id { get; set; }

    public string OrganizationCode { get; set; } = null!;

    public Guid UserId { get; set; }

    public virtual Organization OrganizationCodeNavigation { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
