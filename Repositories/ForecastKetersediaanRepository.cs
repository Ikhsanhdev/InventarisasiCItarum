using Microsoft.EntityFrameworkCore;
using System.Data;
using Serilog;
using Npgsql;
using Dapper;
using IrigasiManganti.Data;
using IrigasiManganti.Models;
using IrigasiManganti.Models.Datatables;
using IrigasiManganti.Helpers;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Text;

namespace IrigasiManganti.Repositories {
    public interface IForecastKetersediaanRepository {
        Task<(IReadOnlyList<ForecastKetersediaan>, int)> GetDataKetersediaan(JqueryDataTableRequest request);
    }

    public class ForecastKetersediaanRepository : IForecastKetersediaanRepository {
        private readonly IrigasiMangantiContext _context;
        private readonly string? _connectionString;

        public ForecastKetersediaanRepository(IrigasiMangantiContext context, IConfiguration configuration) {
            _context = context;
            _connectionString = configuration.GetConnectionString("DefaultConnection");

            if (_connectionString == null)
            {
                Log.Error("Connection string is null. Check your configuration.");
            }
        }

        public async Task<(IReadOnlyList<ForecastKetersediaan>, int)> GetDataKetersediaan(JqueryDataTableRequest request)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                List<ForecastKetersediaan> result = [];
                var query = @$"SELECT * FROM forecast_ketersediaan";

                var parameters = new DynamicParameters();

                int total = 0;
                var sql_count = $"SELECT COUNT(*) FROM ({query}) as total";
                total = connection.ExecuteScalar<int>(sql_count, parameters);

                query += @" 
                OFFSET @Skip ROWS FETCH NEXT @PageSize ROWS ONLY;";
                parameters.Add("@Skip", request.Skip);
                parameters.Add("@PageSize", request.PageSize);

                result = (await connection.QueryAsync<ForecastKetersediaan>(query, parameters)).ToList();

                return (result, total);
            }
            catch (NpgsqlException ex)
            {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Request = request });
                throw;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Request = request });
                throw;
            }
        }
    }
}