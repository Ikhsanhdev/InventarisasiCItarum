using System.Globalization;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IrigasiManganti.Data;
using IrigasiManganti.Models;
using IrigasiManganti.Models.Customs;
using IrigasiManganti.Repositories;

namespace IrigasiManganti.Controllers
{
  public class GlobalController : BaseController
  {
    private IrigasiMangantiContext _context;
    private readonly IGlobalRepository _globalRepository;

    public GlobalController(IrigasiMangantiContext context, IGlobalRepository globalRepository)
    {
      _context = context;
      _globalRepository = globalRepository;
    }
  }
}