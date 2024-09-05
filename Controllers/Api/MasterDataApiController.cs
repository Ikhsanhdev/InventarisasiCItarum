
using System.ComponentModel;
using IrigasiManganti.Interfaces;
using IrigasiManganti.Jobs;
using IrigasiManganti.Models.Customs;
using IrigasiManganti.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Annotations;

namespace IrigasiManganti.Controllers.Api
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "BasicAuthentication")]

    public class MasterDataApiController : ControllerBase
    {
        private readonly IUnitOfWorkRepository _repository;
        private readonly IKebutuhanJob _job;


        public MasterDataApiController(IUnitOfWorkRepository repository, IKebutuhanJob job)
        {
            this._repository = repository;
            this._job = job;
        }

        [HttpGet]
        [Route("/v1/debit-bendung")]

        public async Task<IActionResult> GetDebitBendungan([FromQuery] VMDateRange query)
        {

            var result = new ApiResponse();
            try
            {
                var data = await _repository.MasterDataRepositories.GetDataDebitBendung(query);
                result.MetaData.Code = 200;
                result.MetaData.Message = "Ok";
                result.Response = data;
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                result.MetaData.Code = 500;
                result.MetaData.Message = ex.Message;
                return BadRequest(result);
            }


        }

        [HttpGet]
        [Route("/v1/debit-irigasi")]
        public async Task<IActionResult> GetDebitIrigasi([FromQuery] VMDateRange query)
        {

            var result = new ApiResponse();

            var locations = new string[] { "sidareja", "cihaur", "laksel" };

            if (!locations.Contains(query.location.ToLower()))
            {

                result.MetaData.Code = 400;
                result.MetaData.Message = "Saluran induk tidak terdaftar";

                return BadRequest(result);
            }
            try
            {
                var data = await _repository.MasterDataRepositories.GetDataDebitIrigasi(query);
                result.MetaData.Code = 200;
                result.MetaData.Message = "Ok";
                result.Response = data;
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                result.MetaData.Code = 500;
                result.MetaData.Message = ex.Message;
                return BadRequest(result);
            }
        }

        [HttpGet]
        [Route("v1/debit-pengambilan")]
        public async Task<IActionResult> GetDebitPengambilan([FromQuery] VMDateRangeDebit query) {
            var result = new ApiResponse();

            try {
                var data = await _repository.DebitBendungs.GetDebitPengambilan(query);
                result.MetaData.Code = 200;
                result.MetaData.Message = "Ok";
                result.Response = data;
                return Ok(result);
            } catch(Exception ex) {
                result.MetaData.Code = 500;
                result.MetaData.Message = ex.Message;
                return BadRequest(result);
            }
        }

        [HttpGet]
        [Route("v1/debit-hulu")]
        public async Task<IActionResult> GetDebitHulu([FromQuery] VMDateRangeDebit query) {
            var result = new ApiResponse();

            try {
                var data = await _repository.DebitBendungs.GetDebitHulu(query);
                result.MetaData.Code = 200;
                result.MetaData.Message = "Ok";
                result.Response = data;
                return Ok(result);
            } catch(Exception ex) {
                result.MetaData.Code = 500;
                result.MetaData.Message = ex.Message;
                return BadRequest(result);
            }
        }
    }
}