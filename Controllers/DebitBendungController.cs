using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using IrigasiManganti.Interfaces;
using IrigasiManganti.Models;
using IrigasiManganti.Models.Datatables;
using IrigasiManganti.Helpers;
using Serilog;

namespace IrigasiManganti.Controllers
{
  public class DebitBendungController : BaseController
  {
    private readonly IUnitOfWorkRepository _unitOfWorkRepository;

    public DebitBendungController(IUnitOfWorkRepository unitOfWorkRepository)
    {
      _unitOfWorkRepository = unitOfWorkRepository;
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
  }
}