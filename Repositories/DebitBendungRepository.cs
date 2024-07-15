using Microsoft.EntityFrameworkCore;
using System.Data;
using Serilog;
using Npgsql;
using Dapper;

using IrigasiManganti.Data;
using IrigasiManganti.Models;
using System.Collections;
using IrigasiManganti.Models.Datatables;

namespace IrigasiManganti.Repositories
{
    public interface IDebitBendungRepository
    {
        Task<(IReadOnlyList<dynamic>, int)> GetDatatableByRangeDateAsync(JqueryDataTableRequestDebitBendung request);
    }
    public class DebitBendungRepository : IDebitBendungRepository
    {
        private readonly IrigasiMangantiContext _context;
        private readonly string? _connectionString;
        private readonly IConfiguration _config;

        public DebitBendungRepository(IrigasiMangantiContext context, IConfiguration configuration)
        {
            _context = context;
            _config = configuration;
            _connectionString = _config.GetConnectionString("DefaultConnection");

            if (_connectionString == null)
            {
                Log.Error("Connection string is null. Check your configuration.");
            }

        }

        public async Task<(IReadOnlyList<dynamic>, int)> GetDatatableByRangeDateAsync(JqueryDataTableRequestDebitBendung request)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);

                List<dynamic> result = [];
                var query = @$"SELECT * FROM debit_bendung";

                var parameters = new DynamicParameters();
                var whereConditions = new List<string>{};

                // if (!string.IsNullOrEmpty(request.SearchValue))
                // {
                //     if (request.SearchValue.Contains('\''))
                //     {
                //         request.SearchValue = request.SearchValue.Replace("'", "''");
                //     }

                //     if (request.SearchValue.Contains('['))
                //     {
                //         request.SearchValue = request.SearchValue.Replace("[", "''");
                //     }

                //     whereConditions.Add(@"
                //     (LOWER(""Name"") LIKE @SearchValue OR
                //     LOWER(""Type"") LIKE @SearchValue OR
                //     LOWER(""WatershedName"") LIKE @SearchValue OR
                //     LOWER(""BrandName"") LIKE @SearchValue OR
                //     LOWER(""DeviceId"") LIKE @SearchValue OR
                //     TO_CHAR(""LastReadingAt"", 'YYYY-MM-DD HH24:MI') LIKE @SearchValue OR
                //     LOWER(""DeviceStatus"") LIKE @SearchValue)");
                //     parameters.Add("@SearchValue", "%" + request.SearchValue.ToLower() + "%");
                // }

                var whereClause = whereConditions.Count > 0 ? "WHERE " + string.Join(" AND ", whereConditions) : "";

                query += whereClause;

                int total = 0;
                var sql_count = $"SELECT COUNT(*) FROM ({query}) as total";
                total = connection.ExecuteScalar<int>(sql_count, parameters);

                if (!(string.IsNullOrEmpty(request.SortColumn) && string.IsNullOrEmpty(request.SortColumnDirection)))
                {
                    query = query + @$" ORDER BY {request.SortColumn}" + " " + request.SortColumnDirection;
                }
                else
                {
                    query = query + @" ORDER BY tanggal";
                }

                query += @" 
                OFFSET @Skip ROWS FETCH NEXT @PageSize ROWS ONLY;";
                parameters.Add("@Skip", request.Skip);
                parameters.Add("@PageSize", request.PageSize);

                result = (await connection.QueryAsync<dynamic>(query, parameters)).ToList();
                
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
