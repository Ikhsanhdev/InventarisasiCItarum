using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class Watershed
{
    public Guid Id { get; set; }

    public Guid RiverAreaId { get; set; }

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public Guid? UpdatedBy { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual RiverArea RiverArea { get; set; } = null!;

    public virtual ICollection<Station> Stations { get; set; } = new List<Station>();

    public virtual User? UpdatedByNavigation { get; set; }
}
