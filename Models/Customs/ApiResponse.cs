using System.Collections.Generic;

namespace IrigasiManganti.Models.Customs
{
    public class MetaData
    {
        public int Code { get; set; } = 500;
        public string Message { get; set; } = "Sorry, something went wrong. Please try again later.";
    }

    public class ApiResponse
    {
        public MetaData MetaData { get; set; } = new MetaData();
        public dynamic Response { get; set; }
    }
}