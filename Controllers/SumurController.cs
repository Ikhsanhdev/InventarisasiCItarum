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
using DataTables.AspNetCore.Mvc.Binder;

namespace IrigasiManganti.Controllers
{
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    public class SumurController : BaseController
    {
        private readonly IUnitOfWorkRepository _unitOfWorkRepository;
        private readonly IUnitOfWorkService _service;
        private readonly IKebutuhanJob _job;


        public SumurController(IUnitOfWorkRepository unitOfWorkRepository, IUnitOfWorkService service, IKebutuhanJob job)
        {
            _unitOfWorkRepository = unitOfWorkRepository;
            this._service = service;
            this._job = job;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Create()
        {
            return View(model: new Sumur());
        }

        public IActionResult Edit(Guid id)
        {
            var model = _unitOfWorkRepository.SumurDataRepositories.GetSumurByID(id);
            return View("~/Views/Sumur/Create.cshtml",model);

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
        [HttpPost]
        public async Task<JsonResult> SaveSumur(Sumur model)
        {
            var (code, message) = await _unitOfWorkRepository.SumurDataRepositories.SaveSumur(model);

            return Json(new { code = code, message = message });
        }
    
        public async Task<JsonResult> DeleteSumur(Guid id)
        {
            var (code, message) = await _unitOfWorkRepository.SumurDataRepositories.DeleteSumur(id);
            return Json(new { code = code, message = message });
        }

        public async Task<JsonResult> GetTopSumur()
        {
            var result = await _unitOfWorkRepository.SumurDataRepositories.GetTopSumur();
            return Json(result);
        }

        public async Task<JsonResult> GetPointSumur()
        {
            var result = await _unitOfWorkRepository.SumurDataRepositories.GetDataPointSumur();
            return Json(result);
        }

    }
        
}