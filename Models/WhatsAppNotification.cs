using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class WhatsAppNotification
{
    public Guid RecipientId { get; set; }

    public Guid StationId { get; set; }

    public string Data { get; set; } = null!;

    public string Message { get; set; } = null!;

    public bool? IsSent { get; set; }

    public string Status { get; set; } = null!;

    public DateTime SentAt { get; set; }

    public virtual Station Station { get; set; } = null!;
}
