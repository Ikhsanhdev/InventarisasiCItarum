using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using IrigasiManganti.Interfaces;
using IrigasiManganti.Models;
using IrigasiManganti.Models.Datatables;
using IrigasiManganti.Helpers;
using IrigasiManganti.Models.Customs;
using Serilog;

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

    [Route("/Schema/GetSchemaDataByDate/{tanggal}")]
    public async Task<JsonResult> GetSchemaDataByDate(string tanggal) {
      var result = new ApiResponse();
      try
      {
          result.MetaData.Code = 200;
          result.MetaData.Message = "OK";
          result.Response = await _unitOfWorkRepository.Schemas.GetSchemaDataByDateAsync(tanggal);
      }
      catch (Exception ex)
      {
          result.MetaData.Code = 500;
          result.MetaData.Message = "Sorry, something went wrong. Please try again later or contact administrator.";
          Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
      }

      return Json(result);
    }

    public IActionResult Sidareja() {
      return View();
    }

    public IActionResult SidarejaBagja() {
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