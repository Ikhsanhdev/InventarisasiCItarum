using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using IrigasiManganti.Interfaces;
using IrigasiManganti.Models;
using IrigasiManganti.Models.Datatables;
using IrigasiManganti.Helpers;
using Serilog;
using IrigasiManganti.Services;

namespace IrigasiManganti.Controllers
{
  public class DebitBendungController : BaseController
  {
    private readonly IUnitOfWorkRepository _unitOfWorkRepository;
    private readonly IUnitOfWorkService _service;

    public DebitBendungController(IUnitOfWorkRepository unitOfWorkRepository, IUnitOfWorkService service)
    {
        _unitOfWorkRepository = unitOfWorkRepository;
        _service = service;
    }

    public IActionResult Index() {
      return View();
    }

    public IActionResult Pengambilan() {
        return View();
    }

    public IActionResult Hulu() {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> GetDatatableByRangeDate()
    {
        var ModelRequest = new JqueryDataTableRequestDebitBendung
        {
            Draw = Request.Form["draw"].FirstOrDefault() ?? "",
            Start = Request.Form["start"].FirstOrDefault() ?? "",
            Length = Request.Form["length"].FirstOrDefault() ?? "",
            SortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault() ?? "",
            SortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault() ?? "",
            SearchValue = Request.Form["search[value]"].FirstOrDefault() ?? "",
            RangeDate = Request.Form["range_date"].FirstOrDefault() ?? null
        };

        try
        {
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

            var (debits, recordsTotal) = await _unitOfWorkRepository.DebitBendungs.GetDatatableByRangeDateAsync(ModelRequest);
            var jsonData = new { draw = ModelRequest.Draw, recordsFiltered = recordsTotal, recordsTotal, data = debits };
            return Json(jsonData);
        }
        catch (Exception ex)
        {
            Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, DatatableRequest = ModelRequest });
            throw;
        }
    }

    [HttpPost]
    public async Task<IActionResult> GetDataAll()
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

        try
        {
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

            var (debits, recordsTotal) = await _unitOfWorkRepository.DebitBendungs.GetDataAllAsync(ModelRequest);
            var jsonData = new { draw = ModelRequest.Draw, recordsFiltered = recordsTotal, recordsTotal, data = debits };
            return Json(jsonData);
        }
        catch (Exception ex)
        {
            Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, DatatableRequest = ModelRequest });
            throw;
        }
    }

    public async Task<IActionResult> GetDataDebitHulu()
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

            var (hulu, recordsTotal) = await _unitOfWorkRepository.DebitBendungs.GetDataDebitHulu(ModelRequest);
            var jsonData = new { draw = ModelRequest.Draw, recordsFiltered = recordsTotal, recordsTotal, data = hulu };
            return Json(jsonData);
        }
        catch (Exception ex)
        {
            Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, DatatableRequest = ModelRequest });
            throw;
        }
    }

    public async Task<IActionResult> GetDataDebitPengambilan()
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

            var (pengambilan, recordsTotal) = await _unitOfWorkRepository.DebitBendungs.GetDataDebitPengambilan(ModelRequest);
            var jsonData = new { draw = ModelRequest.Draw, recordsFiltered = recordsTotal, recordsTotal, data = pengambilan };
            return Json(jsonData);
        }
        catch (Exception ex)
        {
            Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, DatatableRequest = ModelRequest });
            throw;
        }
    }

    [HttpPost]
    public async Task<JsonResult> SaveHulu(DebitHulu model)
    {
        if (model.Tanggal == null)
        {
            return new JsonResult(new { code = 400, message = "Tanggal is required" });
        }
        var (code, message) = await _unitOfWorkRepository.DebitBendungs.SaveHulu(model);

        return Json(new { code = code, message = message });
    }

    [HttpPost]
    public async Task<JsonResult> SavePengambilan(DebitPengambilan model)
    {
        if (model.Tanggal == null)
        {
            return new JsonResult(new { code = 400, message = "Tanggal is required" });
        }
        var (code, message) = await _unitOfWorkRepository.DebitBendungs.SavePengambilan(model);

        return Json(new { code = code, message = message });
    }

    [HttpDelete]
    public async Task<JsonResult> DeleteHulu(Guid id)
    {
        var (code, message) = await _unitOfWorkRepository.DebitBendungs.DeleteHulu(id);
        return Json(new { code = code, message = message });
    }

    [HttpDelete]
    public async Task<JsonResult> DeletePengambilan(Guid id)
    {
        var (code, message) = await _unitOfWorkRepository.DebitBendungs.DeletePengambilan(id);
        return Json(new { code = code, message = message });
    }

    [HttpPost]
    public async Task<IActionResult> CreateEditHulu(Guid id)
    {
        if (id == Guid.Empty)
        {
            DebitHulu model = new();
            return PartialView("_CreateEditHulu", model);
        }
        var data = _unitOfWorkRepository.DebitBendungs.GetDataHuluById(id);
        if (data == null) return PartialView("_CreateEditPengambilan", new DebitHulu());
        ViewData["Id"] = data.Id;
        return PartialView("_CreateEditHulu", data);
    }

    [HttpPost]
    public async Task<IActionResult> CreateEditPengambilan(Guid id)
    {
        if (id == Guid.Empty)
        {
            DebitPengambilan model = new();
            return PartialView("_CreateEditPengambilan", model);
        }
        var data = _unitOfWorkRepository.DebitBendungs.GetDataPengambilanById(id);
        if (data == null) return PartialView("_CreateEditPengambilan", new DebitPengambilan());
        ViewData["Id"] = data.Id;
        return PartialView("_CreateEditPengambilan", data);
    }

    [HttpPost]
    public async Task<JsonResult> UpdateHulu(DebitHulu model)
    {
        var (code, message) = await _unitOfWorkRepository.DebitBendungs.UpdateHulu(model);

        return Json(new { code = code, message = message });
    }

    [HttpPost]
    public async Task<JsonResult> UpdatePengambilan(DebitPengambilan model)
    {
        var (code, message) = await _unitOfWorkRepository.DebitBendungs.UpdatePengambilan(model);

        return Json(new { code = code, message = message });
    }

    public async Task<IActionResult> DownloadDebitPengambilan() {
        IEnumerable<DebitPengambilan> data = _unitOfWorkRepository.DebitBendungs.GetAllDebitPengambilan();

        var wba = await _service.Csvs.GenerateAllDebitPengambilan(data);
        using (var stream = new MemoryStream())
        {
            string fileName = $"debit_pengambilan.xlsx";
            wba.SaveAs(stream);  // Assuming you're using ClosedXML which has SaveAs method for streams
            var content = stream.ToArray();
            return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }
    }

    public async Task<IActionResult> DownloadDebitHulu() {
        IEnumerable<DebitHulu> data = _unitOfWorkRepository.DebitBendungs.GetAllDebitHulu();

        var wba = await _service.Csvs.GenerateAllDebitHulu(data);
        using (var stream = new MemoryStream())
        {
            string fileName = $"debit_hulu.xlsx";
            wba.SaveAs(stream);  // Assuming you're using ClosedXML which has SaveAs method for streams
            var content = stream.ToArray();
            return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }
    }
  }
}