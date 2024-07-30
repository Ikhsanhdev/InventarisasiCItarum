using Microsoft.EntityFrameworkCore;
using System.Data;
using Serilog;
using Npgsql;
using Dapper;

using IrigasiManganti.Data;
using IrigasiManganti.Models;

namespace IrigasiManganti.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetAuthByUsername(string username);
    }
    public class UserRepository : IUserRepository
    {
        private readonly IrigasiMangantiContext _context;
        private readonly IDbConnection _db;

        public UserRepository(IrigasiMangantiContext context, IConfiguration configuration)
        {
            _context = context;
            _db = new NpgsqlConnection(configuration.GetConnectionString("DefaultConnection"));

        }

        public async Task<User?> GetAuthByUsername(string username)
        {
            var organizationCode = "";

            try
            {
                var query = @$"SELECT * FROM users WHERE username = @Username LIMIT 1";
                var result = await _db.QueryFirstOrDefaultAsync<User>(query, new { Username = username, OrganizationCode = organizationCode });
                return result;
            }
            catch (NpgsqlException ex)
            {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Username = username, OrganizationCode = organizationCode });
                throw;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Username = username, OrganizationCode = organizationCode });
                throw;
            }
        }
    }
}
