using Microsoft.AspNetCore.Mvc;
using IrigasiManganti.Helpers;
using IrigasiManganti.Interfaces;
using IrigasiManganti.Models.Datatables;
using Serilog;

using HtmlAgilityPack;

namespace IrigasiManganti.Controllers
{
    public class HomeController : BaseController
    {
        private readonly IUnitOfWorkRepository _unitOfWorkRepository;

        public HomeController(IUnitOfWorkRepository unitOfWorkRepository)
        {
            _unitOfWorkRepository = unitOfWorkRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult DetailTabulasi(string irg) {
            if(irg == "cihaur") {
                return View("~/Views/Home/CihaurTab.cshtml");
            } else if(irg == "sidareja") {
                return View("~/Views/Home/SidarejaTab.cshtml");
            } else if(irg == "lakbok") {
                return View("~/Views/Home/LakbokTab.cshtml");
            } else {
                return View("Error");
            }
        }

        public IActionResult Map() {
            return View();
        }

        public async Task<IActionResult> GetDataKetersediaan() {
            try {
                var ModelRequest = new JqueryDataTableRequest {
                    Draw = Request.Form["draw"].FirstOrDefault() ?? "",
                    Start = Request.Form["start"].FirstOrDefault() ?? "",
                    Length = Request.Form["length"].FirstOrDefault() ?? "",
                    SortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault() ?? "",
                    SortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault() ?? "",
                    SearchValue = Request.Form["search[value]"].FirstOrDefault() ?? ""
                };

                // Check if page size is set to show all
                if (ModelRequest.Length == "-1") {
                    // Set page size to a large number or adjust your data retrieval logic accordingly
                    ModelRequest.PageSize = int.MaxValue;
                } else {
                    ModelRequest.PageSize = ModelRequest.Length != null ? Convert.ToInt32(ModelRequest.Length) : 0;
                }

                ModelRequest.Skip = ModelRequest.Start != null ? Convert.ToInt32(ModelRequest.Start) : 0;

                var (users, recordsTotal) = await _unitOfWorkRepository.forecastKetersediaan.GetDataKetersediaan(ModelRequest);
                var jsonData = new { draw = ModelRequest.Draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = users };
                return Json(jsonData);
            } catch(Exception ex) {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                throw;
            }
        }
    }
}
