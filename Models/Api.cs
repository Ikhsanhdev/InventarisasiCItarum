// Create a class for your item type
using System.ComponentModel.DataAnnotations;
using IrigasiManganti; // Replace YourNamespace with the actual namespace of your Api class


public class Api
{
    public string? DeviceId { get; set; }
    public string? Slug { get; set; }
    public string? OrganizationCode { get; set; }
    public DateTime? LastReadingAt {get; set;}
    public string? DeviceStatus {get; set;}
}
