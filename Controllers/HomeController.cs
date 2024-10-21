using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using IrigasiManganti.Interfaces;
using IrigasiManganti.Models;
using IrigasiManganti.Models.Datatables;
using IrigasiManganti.Helpers;
using IrigasiManganti.Models.Customs;
using Serilog;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using IrigasiManganti.Jobs;

namespace IrigasiManganti.Controllers
{
    [AllowAnonymous]
    public class HomeController : BaseController
    {
        private readonly IUnitOfWorkRepository _unitOfWorkRepository;

        public HomeController(IUnitOfWorkRepository unitOfWorkRepository)
        {
            _unitOfWorkRepository = unitOfWorkRepository;
        }

        public async Task<IActionResult> Index()
        {
            var Model = await _unitOfWorkRepository.SumurDataRepositories.GetTopSumur();
            return View(Model);
        }
        public async Task<IActionResult> IndexNew()
        {
            var Model = await _unitOfWorkRepository.SumurDataRepositories.GetTopSumur();
            return View("IndexNew",Model);
        }

        public IActionResult ModelForecast()
        {
            return View("ModelForecast");
        }

        public IActionResult ModelAi()
        {
            return View("ModelAi");
        }

        public IActionResult DetailTabulasi(string irg)
        {
            if (irg == "cihaur")
            {
                return View("~/Views/Home/CihaurTab.cshtml");
            }
            else if (irg == "sidareja")
            {
                return View("~/Views/Home/SidarejaTab.cshtml");
            }
            else if (irg == "lakbok")
            {
                return View("~/Views/Home/LakbokTab.cshtml");
            }
            else
            {
                return View("Error");
            }
        }

        public IActionResult Map()
        {
            return View();
        }

        public async Task<IActionResult> GetDataKetersediaan()
        {
            try
            {
                var ModelRequest = new JqueryDataTableRequest
                {
                    Draw = Request.Form["draw"].FirstOrDefault() ?? "",
                    Start = Request.Form["start"].FirstOrDefault() ?? "",
                    Length = Request.Form["length"].FirstOrDefault() ?? "",
                    SortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault() ?? "",
                    SortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault() ?? "",
                    SearchValue = Request.Form["search[value]"].FirstOrDefault() ?? ""
                };

                // Check if page size is set to show all
                if (ModelRequest.Length == "-1")
                {
                    // Set page size to a large number or adjust your data retrieval logic accordingly
                    ModelRequest.PageSize = int.MaxValue;
                }
                else
                {
                    ModelRequest.PageSize = ModelRequest.Length != null ? Convert.ToInt32(ModelRequest.Length) : 0;
                }

                ModelRequest.Skip = ModelRequest.Start != null ? Convert.ToInt32(ModelRequest.Start) : 0;

                var (users, recordsTotal) = await _unitOfWorkRepository.forecastKetersediaan.GetDataKetersediaan(ModelRequest);
                var jsonData = new { draw = ModelRequest.Draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = users };
                return Json(jsonData);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                throw;
            }
            
        }
         public async Task<JsonResult> GetPointSumur()
        {
            var result = await _unitOfWorkRepository.SumurDataRepositories.GetDataPointSumur();
            return Json(result);
        }

        public IActionResult Detail(string code)
        {
            var model = new Sumur();
            
            model = _unitOfWorkRepository.SumurDataRepositories.GetSumurByCode(code);
        
            if (model == null)
            {
                return RedirectToAction("PageNotFound");
            }
            return View("Detail",model);
        }

        [Route("404")]
        public IActionResult PageNotFound()
        {
            return View();
        }
        public async Task<IActionResult> GetSumurData(string date)
        {
             var ModelRequest = new JqueryDataTableRequest
            {
                Draw = Request.Form["draw"].FirstOrDefault() ?? "",
                Start = Request.Form["start"].FirstOrDefault() ?? "",
                Length = Request.Form["length"].FirstOrDefault() ?? "25",
                SortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault() ?? "",
                SortColumnDirection = Request.Form["order[0]dir"].FirstOrDefault() ?? "",
                SearchValue = Request.Form["search[value]"].FirstOrDefault() ?? ""
            };

            try
            {
                if (ModelRequest.Length == "-1")
                {
                    ModelRequest.PageSize = int.MaxValue;
                }
                else
                {
                    ModelRequest.PageSize = ModelRequest.PageSize != null ? Convert.ToInt32(ModelRequest.Length) : 0;
                }

                ModelRequest.Skip = ModelRequest.Start != null ? Convert.ToInt32(ModelRequest.Start) : 0;

                var (rekomendasi, recordsTotal) = await _unitOfWorkRepository.SumurDataRepositories.GetDataSumur(ModelRequest);
                var jsonData = new { draw = ModelRequest.Draw, recordsFiltered = recordsTotal, recordsTotal, data = rekomendasi };
                return Json(jsonData);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, DatatableRequest = ModelRequest });
                throw;
            }
        }
    }
    
}
