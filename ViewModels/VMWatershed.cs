namespace IrigasiManganti.ViewModels;

public class VMWatershed
{
    public Guid Id { get; set; }

    public Guid RiverAreaId { get; set; }

    public string RiverAreaName { get; set; }

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;
    public DateTime? UpdatedAt { get; set; }
}
