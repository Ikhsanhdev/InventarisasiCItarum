using System;
using System.Collections.Generic;

namespace IrigasiManganti.Models.Customs
{
  public class SaluranIrigasi
  {
    public int id { get; set; }
    public string? nama_saluran { get; set; }
    public List<Petak> petak { get; set; } = new List<Petak>();
  }
}