using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using IrigasiManganti.Interfaces;
using IrigasiManganti.Models;
using IrigasiManganti.Models.Datatables;
using IrigasiManganti.Helpers;
using IrigasiManganti.Models.Customs;
using Serilog;
using IrigasiManganti.Jobs;

namespace IrigasiManganti.Controllers {
    public class MasterController : BaseController {
        private readonly IUnitOfWorkRepository _unitOfWorkRepository;
        private readonly IUnitOfWorkService _service;
        private readonly IKebutuhanJob _job;


        public MasterController(IUnitOfWorkRepository unitOfWorkRepository, IUnitOfWorkService service, IKebutuhanJob job)
        {
            _unitOfWorkRepository = unitOfWorkRepository;
            this._service = service;
            this._job = job;
        }

        public IActionResult Petak() {
            return View();
        }

        public IActionResult Kebutuhan()
        {
            return View();
        }

        public async Task<JsonResult> GetDataSmopi(){

            var data = await _service.Kebutuhan.GetDataFromApiSmopi();
            return Json(data);
        }

        [HttpPost]
        public async Task<JsonResult> SyncronDataSmopi()
        {
            try
            {
                await _job.InsertDataKebutuhanFromSmopi();
                return Json(new { isSuccess = true, message = "Sinkronisasi Data SMOPI Berhasil"});
            }
            catch (System.Exception)
            {
                return Json(new { isSuccess = false, message = "Sinkronisasi Data SMOPI Gagal" });
            }
           
            
        }

        public async Task<IActionResult> GetDataPetak() {
            var ModelRequest = new JqueryDataTableRequest {
                Draw = Request.Form["draw"].FirstOrDefault() ?? "",
                Start = Request.Form["start"].FirstOrDefault() ?? "",
                Length = Request.Form["length"].FirstOrDefault() ?? "",
                SortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault() ?? "",
                SortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault() ?? "",
                SearchValue = Request.Form["search[value]"].FirstOrDefault() ?? ""
            };

            try {
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

                var (petak, recordsTotal) = await _unitOfWorkRepository.MasterDataRepositories.GetDataPetak(ModelRequest);
                var jsonData = new { draw = ModelRequest.Draw, recordsFiltered = recordsTotal, recordsTotal, data = petak };
                return Json(jsonData);
            } catch(Exception ex) {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, DatatableRequest = ModelRequest });
                throw;
            }
        }

        public async Task<IActionResult> GetDataKetersediaan()
        {
            
            var ModelRequest = new JqueryDataTableRequestKebutuhan
            {
                Draw = Request.Form["draw"].FirstOrDefault() ?? "",
                Start = Request.Form["start"].FirstOrDefault() ?? "",
                Length = Request.Form["length"].FirstOrDefault() ?? "",
                SortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault() ?? "",
                SortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault() ?? "",
                SearchValue = Request.Form["search[value]"].FirstOrDefault() ?? "",
                Year = Convert.ToInt32(Request.Form["year"].FirstOrDefault() == "" ? DateTime.Now.Year.ToString() : Request.Form["year"].FirstOrDefault()),
                Month = Convert.ToInt32(Request.Form["month"].FirstOrDefault() == "" ? DateTime.Now.Month.ToString() : Request.Form["month"].FirstOrDefault()),
                Periode = Convert.ToInt32(Request.Form["periode"].FirstOrDefault() == "" ? (DateTime.Now.Day < 16 ? "1" : "2")  : Request.Form["periode"].FirstOrDefault())
            };

            try
            {
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

                var (petak, recordsTotal) = await _unitOfWorkRepository.MasterDataRepositories.GetDataKebutuhan(ModelRequest);
                var jsonData = new { draw = ModelRequest.Draw, recordsFiltered = recordsTotal, recordsTotal, data = petak };
                return Json(jsonData);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, DatatableRequest = ModelRequest });
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateEditPetak(Guid id)
        {
            if (id == Guid.Empty)
            {
                MasterPetak model = new();
                return PartialView("_CreateEditPetak", model);
            }
            var data = _unitOfWorkRepository.MasterDataRepositories.GetDataPetakById(id);
            if (data == null) return PartialView("_CreateEditPetak", new MasterPetak());
            ViewData["Id"] = data.Id;
            return PartialView("_CreateEditPetak", data);
        }

        [HttpDelete]
        public async Task<JsonResult> DeletePetak(Guid id)
        {
            var (code, message) = await _unitOfWorkRepository.MasterDataRepositories.DeletePetak(id);
            return Json(new { code = code, message = message });
        }

        [HttpPost]
        public async Task<JsonResult> SavePetak(MasterPetak model)
        {
            var (code, message) = await _unitOfWorkRepository.MasterDataRepositories.SavePetak(model);

            return Json(new { code = code, message = message });
        }
    }
}