using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Spreadsheet;
using Hangfire;
using IrigasiManganti.Helpers;
using IrigasiManganti.Interfaces;
using IrigasiManganti.Jobs;
using IrigasiManganti.Models.Customs;
using IrigasiManganti.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace IrigasiManganti.Controllers.Api
{
    [Authorize(AuthenticationSchemes = "BasicAuthentication")]
    [ApiController]
    public class KetersediaanApiController : ControllerBase
    {
        private readonly IKetersediaanJob _job;
        private readonly IBackgroundJobClient _backgroundJobClient;
        private readonly IUnitOfWorkService _service;
        public KetersediaanApiController(IBackgroundJobClient backgroundJobClient, IUnitOfWorkService service, IKetersediaanJob job)
        {
            this._backgroundJobClient = backgroundJobClient;
            this._service = service;
            this._job = job;
        }

        [HttpPost("/v1/ketersediaan/upload")]
        public IActionResult UploadFile(IFormFile file)
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
                var directory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "ketersediaan");
                string filePath = FileHelper.SaveFile(file, directory);

                _backgroundJobClient.Enqueue(() => _job.SaveKetersediaanJob(table, filePath)) ;
               

                result.MetaData.Code = 200;
                result.MetaData.Message = "OK";
                
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