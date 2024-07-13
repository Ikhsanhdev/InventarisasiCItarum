using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class WhatsAppRecipient
{
    public Guid Id { get; set; }

    public string OrganizationCode { get; set; } = null!;

    public string RecipientType { get; set; } = null!;

    public string RecipientIdentifier { get; set; } = null!;

    public string RecipientName { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public Guid CreatedBy { get; set; }

    public virtual Organization OrganizationCodeNavigation { get; set; } = null!;
}
