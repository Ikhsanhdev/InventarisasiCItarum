using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class CallBackUrl
{
    public Guid Id { get; set; }

    public string OrganizationCode { get; set; } = null!;

    public string Url { get; set; } = null!;

    public virtual Organization OrganizationCodeNavigation { get; set; } = null!;
}
