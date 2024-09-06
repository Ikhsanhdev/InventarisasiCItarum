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
using System.Text.Json;
using Newtonsoft.Json.Linq;
using IrigasiManganti.ViewModels;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Globalization;

namespace IrigasiManganti.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "BasicAuthentication")]
    [Route("api/[controller]")]
    public class ApiController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IUnitOfWorkRepository _unitOfWorkRepository;

        public ApiController(IUnitOfWorkRepository unitOfWorkRepository, IHttpClientFactory httpClientFactory)
        {
            _unitOfWorkRepository = unitOfWorkRepository;
            _httpClientFactory = httpClientFactory;
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

        [HttpGet("fetch-data-from-file")]
        public async Task<IActionResult> TestFromFile()
        {
            try
            {
                // Set the path to your JSON file
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "index.json");

                // Check if the file exists
                if (!System.IO.File.Exists(filePath))
                {
                    return BadRequest("JSON file not found.");
                }

                // Read the file contents
                string fileContent = await System.IO.File.ReadAllTextAsync(filePath);

                // Log the raw JSON data to the console
                // System.Console.WriteLine("Raw JSON Data:");
                // System.Console.WriteLine(fileContent);
                var jsonArray = JArray.Parse(fileContent);
                var bangunanUtamaData = new List<JToken>();
                // Check if the JSON content starts with '[' (an array)
                foreach (var item in jsonArray)
                {
                    // Access the "saluran" property, which is an array
                    var saluranArray = item["saluran"] as JArray;
                    if (saluranArray != null)
                    {
                        // Iterate through the "saluran" array
                        foreach (var saluranItem in saluranArray)
                        {
                            // Access the "bangunanutama" property
                            var bangunanUtama = saluranItem["bangunanutama"];
                            if (bangunanUtama != null)
                            {
                                // Add to the collection if it exists
                                bangunanUtamaData.Add(bangunanUtama);

                                // Log the data
                                System.Console.WriteLine("Bangunan Utama Data:");
                                System.Console.WriteLine(bangunanUtama.ToString());
                            }
                        }
                    }
                }

                if (bangunanUtamaData.Count == 0)
                {
                    return BadRequest("No 'bangunanutama' data found in the JSON file.");
                }
                 return Ok(bangunanUtamaData);
            }
            catch (Exception ex)
            {
                // Handle any errors that occur while reading the file or parsing JSON
                return BadRequest($"Error processing file: {ex.Message}");
            }
        }

        [HttpGet("fetch-petak-from-file")]
        public async Task<IActionResult> GetPetakFromFile()
        {
            try
            {
                // Set the path to your JSON file
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "sidareja.json");

                // Check if the file exists
                if (!System.IO.File.Exists(filePath))
                {
                    return BadRequest("JSON file not found.");
                }

                // Read the file contents
                string fileContent = await System.IO.File.ReadAllTextAsync(filePath);

                // Parse the JSON as an array
                var jsonArray = JArray.Parse(fileContent);

                // Create a collection to hold 'petak' data
                var petakData = new List<JToken>();

                // Iterate through the outer array (jsonArray)
                foreach (var item in jsonArray)
                {
                    // Access the "saluran" property, which is an array
                    var saluranArray = item["saluran"] as JArray;
                    if (saluranArray != null)
                    {
                        // Iterate through the "saluran" array
                        foreach (var saluranItem in saluranArray)
                        {
                            // Access the "bangunanutama" property, which is also an array
                            var bangunanUtamaArray = saluranItem["bangunanutama"] as JArray;
                            if (bangunanUtamaArray != null)
                            {
                                // Iterate through the "bangunanutama" array
                                foreach (var bangunanItem in bangunanUtamaArray)
                                {
                                    // Access the "petak" property
                                    var petak = bangunanItem["petak"];
                                    if (petak != null)
                                    {
                                        // Add to the collection if it exists
                                        petakData.Add(petak);

                                        // Log the petak data
                                        System.Console.WriteLine("Petak Data:");
                                        System.Console.WriteLine(petak.ToString());
                                    }
                                }
                            }
                        }
                    }
                }

                // If no petakData is found, return an error message
                if (petakData.Count == 0)
                {
                    return BadRequest("No 'petak' data found in the JSON file.");
                }

                // Return the petak data as the response
                return Ok(petakData);
            }
            catch (Exception ex)
            {
                // Handle any errors that occur while reading the file or parsing JSON
                return BadRequest($"Error processing file: {ex.Message}");
            }
        }

        [HttpPost("insert-smopi")]
        public async Task<IActionResult> InsertSmopi()
        {
            try
            {
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "sidareja.json");

                if (!System.IO.File.Exists(filePath))
                {
                    return BadRequest("JSON file not found.");
                }

                string fileContent = await System.IO.File.ReadAllTextAsync(filePath);
                var jsonArray = JArray.Parse(fileContent);

                foreach (var item in jsonArray)
                {
                    var saluranArray = item["saluran"] as JArray;
                    if (saluranArray != null)
                    {
                        foreach (var saluranItem in saluranArray)
                        {
                            var bangunanUtamaArray = saluranItem["bangunanutama"] as JArray;
                            if (bangunanUtamaArray != null)
                            {
                                foreach (var bangunanItem in bangunanUtamaArray)
                                {
                                    var petak = bangunanItem["petak"];
                                    var tmtArray = petak["tmt"] as JArray;
                                    var location = "";

                                    if(petak["namapetak"].ToString().Contains("BS")) {
                                        location = "Sidareja";
                                    }

                                    if (tmtArray != null && tmtArray.Count > 0) {
                                        foreach (var tmt in tmtArray)
                                        {
                                            double kebutuhan;
                                            var kebutuhanString = tmt["kebutuhan_air"].ToString();
                                            if(kebutuhanString.Contains(".")) {
                                                kebutuhan = Convert.ToDouble(kebutuhanString);
                                            } else {
                                                kebutuhan = (int)tmt["kebutuhan_air"];
                                            }
                                            
                                            Console.WriteLine(kebutuhan);
                                            var petakData = new VMPetak
                                            {
                                                nama_petak = (string)petak["namapetak"],
                                                jenis_bangunan = (string)petak["jenisbangunan"],
                                                luas = (int)petak["luas"],
                                                // kebutuhan = (int)tmt["kebutuhan_air"],
                                                kebutuhan = kebutuhan,
                                                lokasi = location,
                                                updated_at = DateTime.Now
                                                // tanggal = DateTime.Now.ToString("yyyy-MM-dd")
                                            };

                                            await _unitOfWorkRepository.MasterDataRepositories.InsertSmopiAsync(petakData);
                                        }
                                    } else {
                                        var petakData = new VMPetak
                                        {
                                            nama_petak = (string)petak["namapetak"],
                                            jenis_bangunan = (string)petak["jenisbangunan"],
                                            luas = (int)petak["luas"],
                                            kebutuhan = 0f, // Default value when no TMT data
                                            lokasi = location,
                                            updated_at = DateTime.Now
                                            // tanggal = DateTime.Now.ToString("yyyy-MM-dd")
                                        };

                                        await _unitOfWorkRepository.MasterDataRepositories.InsertSmopiAsync(petakData);
                                    }
                                    // Create the Saluran;Data object and pass it to the repository
                                    // var petakData = new VMPetak
                                    // {
                                    //     nama_petak = (string)petak["namapetak"],
                                    //     jenis_bangunan = (string)petak["jenisbangunan"],
                                    //     luas = (int)petak["luas"],
                                    //     lokasi = location
                                    // };

                                    // await _unitOfWorkRepository.MasterDataRepositories.InsertSmopiAsync(petakData);
                                }
                            }
                        }
                    }
                }

                return Ok("Data inserted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error inserting data: {ex.Message}");
            }
        }

        private static float ConvertToFloat(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return 0f;

            // Mengganti koma dengan titik untuk konsistensi
            value = value.Replace(",", ".");

            // Mencoba parsing dengan InvariantCulture
            if (float.TryParse(value, NumberStyles.Any, CultureInfo.InvariantCulture, out float result))
            {
                return result;
            }

            // Jika gagal, kembalikan 0 atau throw exception
            Console.WriteLine($"Failed to parse value: {value}");
            return 0f;
            // Atau throw new FormatException($"Unable to parse '{value}' to float.");
        }
    }
}