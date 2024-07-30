using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using IrigasiManganti.Models;
using Newtonsoft.Json;
using System.Text;
using System.Net.Http.Headers;
using IrigasiManganti.Models.Datatables;
using Dapper;
using IrigasiManganti.Interfaces;
using IrigasiManganti.Services;
using IrigasiManganti.Models.Customs;
using Microsoft.AspNetCore.Authorization;

namespace IrigasiManganti.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "BasicAuthentication")]
    [Route("api/[controller]")]
    public class ApiController : Controller
    {
        private readonly IUnitOfWorkRepository _unitOfWorkRepository;

        public ApiController(IUnitOfWorkRepository unitOfWorkRepository)
        {
            _unitOfWorkRepository = unitOfWorkRepository;
        }


        [HttpGet]
        [Route("/v1/saluran/primer")]
        public async Task<JsonResult> GetSaluranPrimer()
        {
            var result = new ApiResponse();

            try
            {
                result.MetaData.Code = 200;
                result.MetaData.Message = "OK";

                List<SaluranIrigasi> results = new List<SaluranIrigasi>
                {
                    new SaluranIrigasi { 
                        id = 1,
                        nama_saluran = "Saluran Sidareja",
                        petak = [],
                    },
                    new SaluranIrigasi { id = 2, nama_saluran = "Saluran Cihaur" },
                    new SaluranIrigasi { id = 3, nama_saluran = "Saluran Lakbok" }
                };

                result.Response = results;
            }
            catch (Exception ex)
            {
                result.MetaData.Code = 500;
                result.MetaData.Message = "Sorry, something went wrong. Please try again later or contact administrator.";
                result.Response = null;
            }

            return Json(result);
        }
    }
}