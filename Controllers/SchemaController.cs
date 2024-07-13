using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using IrigasiManganti.Interfaces;
using IrigasiManganti.Models;
using IrigasiManganti.Models.Datatables;
using IrigasiManganti.Helpers;
using IrigasiManganti.Models.Customs;

namespace IrigasiManganti.Controllers
{
  public class SchemaController : BaseController
  {
    private readonly IUnitOfWorkRepository _unitOfWorkRepository;

    public SchemaController(IUnitOfWorkRepository unitOfWorkRepository)
    {
      _unitOfWorkRepository = unitOfWorkRepository;
    }

    public IActionResult Index()
    {
      return View();
    }

    public IActionResult Sidareja() {
      return View();
    }

    public IActionResult SidarejaAndri() {
      return View();
    }

    public IActionResult SidarejaL2() {
      return View();
    }
    
    public IActionResult Cihaur() {
      return View();
    }

    public IActionResult Lakbok() {
      return View();
    }
  }
}