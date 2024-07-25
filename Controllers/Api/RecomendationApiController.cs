using Hangfire;
using IrigasiManganti.Helpers;
using IrigasiManganti.Interfaces;
using IrigasiManganti.Jobs;
using IrigasiManganti.Models.Customs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace IrigasiManganti.Controllers.Api
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [Authorize(AuthenticationSchemes = "BasicAuthentication")]
    [ApiController]
    public class RecomendationApiController : ControllerBase
    {
        private readonly IReRecomendationJob _job;
        private readonly IBackgroundJobClient _backgroundJobClient;
        private readonly IUnitOfWorkService _service;
        public RecomendationApiController(IReRecomendationJob job, IBackgroundJobClient backgroundJobClient, IUnitOfWorkService service)
        {
            this._job = job;
            this._backgroundJobClient = backgroundJobClient;
            this._service = service;
        }

        [HttpPost("/v1/rekomendasi/upload")]
        public  IActionResult UploadFile(IFormFile file)
        {
            var result = new ApiResponse();
            try
            {
                if (file == null || file.Length == 0)
                {
                    result.MetaData.Code = 400;
                    result.MetaData.Message = "No file uploaded.";

                    return BadRequest(result);
                }

                if (Path.GetExtension(file.FileName).ToLower() != ".csv")
                {
                    result.MetaData.Code = 400;
                    result.MetaData.Message = "Not a valid CSV file.";

                    return BadRequest(result);
                }

                var table = _service.Csvs.ReadCsvToDataTable(file);
                var directory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "rekomendasi");
                string filePath = FileHelper.SaveFile(file, directory);

                _backgroundJobClient.Enqueue(() => _job.SaveRecomendationJob(table, filePath)) ;
                

                result.MetaData.Code = 200;
                result.MetaData.Message = "OK";
                result.Response = table;
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                result.MetaData.Code = 500;
                result.MetaData.Message = ex.Message;
                Log.Error(ex, "general Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data from api -- API ERROR" });
                return BadRequest(result);
            }
           
        }
    }
}