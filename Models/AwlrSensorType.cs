using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models;

public partial class AwlrSensorType
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }
}
