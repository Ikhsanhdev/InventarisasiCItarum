using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using IrigasiManganti.Interfaces;
using IrigasiManganti.Models;
using IrigasiManganti.Models.Datatables;
using IrigasiManganti.Helpers;

namespace IrigasiManganti.Controllers
{
  [Authorize]
  public class UserController : BaseController
  {
    private readonly IUnitOfWorkRepository _unitOfWorkRepository;

    public UserController(IUnitOfWorkRepository unitOfWorkRepository)
    {
      _unitOfWorkRepository = unitOfWorkRepository;
    }

    public IActionResult Index()
    {
      return View();
    }

  }
}