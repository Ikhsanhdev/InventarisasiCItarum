using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IrigasiManganti.Interfaces;
using IrigasiManganti.Models.Customs;
using IrigasiManganti.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IrigasiManganti.Controllers.Api
{
    [Authorize(AuthenticationSchemes = "BasicAuthentication")]
    [ApiController]
    public class MasterDataApiController : ControllerBase
    {
        private readonly IUnitOfWorkRepository _repository;

        public MasterDataApiController(IUnitOfWorkRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        [Route("/v1/debit-bendung")]
        public async Task<IActionResult> GetDebitBendungan([FromQuery] VMDateRange query){

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
    }
}