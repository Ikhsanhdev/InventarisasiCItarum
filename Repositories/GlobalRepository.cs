using Microsoft.EntityFrameworkCore;
using IrigasiManganti.Data;
using Serilog;

namespace IrigasiManganti.Repositories
{

    public interface IGlobalRepository
    {
       
    }

    public class GlobalRepository : IGlobalRepository
    {
        private readonly string? _connectionString;
        private readonly IrigasiMangantiContext _context;

        public GlobalRepository(IrigasiMangantiContext context, IConfiguration configuration)
        {
            _context = context;
            _connectionString = configuration.GetConnectionString("DefaultConnection");

            if (_connectionString == null)
            {
                Log.Error("Connection string is null. Check your configuration.");
            }
        }
    }
}
