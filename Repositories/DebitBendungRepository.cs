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
        Task<(IReadOnlyList<dynamic>, int)> GetDatatableByRangeDateAsync2(JqueryDataTableRequestDebitBendung request);
        Task<(IReadOnlyList<dynamic>, int)> GetDatatableByRangeDateAsync(JqueryDataTableRequestDebitBendung request);
        Task<(IReadOnlyList<dynamic>, int)> GetDataAllAsync(JqueryDataTableRequest request);
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

        public async Task<(IReadOnlyList<dynamic>, int)> GetDatatableByRangeDateAsync2(JqueryDataTableRequestDebitBendung request)
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
        
        public async Task<(IReadOnlyList<dynamic>, int)> GetDatatableByRangeDateAsync(JqueryDataTableRequestDebitBendung request)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);

                List<dynamic> result = new List<dynamic>();
                var query = "SELECT * FROM debit_bendung";

                var parameters = new DynamicParameters();
                var whereConditions = new List<string>();

                if (!string.IsNullOrEmpty(request.RangeDate))
                {
                    int rangeDays;
                    DateTime daysLater;
                    DateTime today = DateTime.Now;

                    switch (request.RangeDate)
                    {
                        case "7d":
                            rangeDays = 7;
                            break;
                        case "15d":
                            rangeDays = 15;
                            break;
                        case "30d":
                            rangeDays = 30;
                            break;
                        default:
                            rangeDays = 7;
                            break;
                    }

                    daysLater = today.AddDays(rangeDays);
                    whereConditions.Add(@"""tanggal"" BETWEEN @FormattedToday AND @FormattedLater");
                    parameters.Add("@FormattedLater", daysLater.Date);
                    parameters.Add("@FormattedToday", today.Date);
                }

                var whereClause = whereConditions.Count > 0 ? "WHERE " + string.Join(" AND ", whereConditions) : "";
                query += " " + whereClause;

                int total = 0;
                var sql_count = $"SELECT COUNT(*) FROM ({query}) as total";
                total = connection.ExecuteScalar<int>(sql_count, parameters);

                if (!string.IsNullOrEmpty(request.SortColumn) && !string.IsNullOrEmpty(request.SortColumnDirection))
                {
                    query += @$" ORDER BY {request.SortColumn} {request.SortColumnDirection}";
                }
                else
                {
                    query += " ORDER BY \"tanggal\"";
                }

                query += " OFFSET @Skip LIMIT @PageSize;";
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

        public async Task<(IReadOnlyList<dynamic>, int)> GetDataAllAsync(JqueryDataTableRequest request) {
            try {
                using var connection = new NpgsqlConnection(_connectionString);
                List<dynamic> result = new List<dynamic>();

                var query = $@"SELECT 
                    db.id,
                    db.tanggal,
                    db.ketersediaan_min AS ""ketersediaanMin"",
                    db.ketersediaan_max AS ""ketersediaanMax"",
                    db.kebutuhan,
                    db.ketersediaan_avg AS ""ketersediaanAvg""
                FROM 
                    debit_bendung AS db
                ORDER BY
                    tanggal";

                var parameters = new DynamicParameters();
                var whereConditions = new List<string>();

                if (!string.IsNullOrEmpty(request.SearchValue))
                {
                    if (request.SearchValue.Contains('\''))
                    {
                        request.SearchValue = request.SearchValue.Replace("'", "''");
                    }

                    if (request.SearchValue.Contains('['))
                    {
                        request.SearchValue = request.SearchValue.Replace("[", "''");
                    }

                    whereConditions.Add(@"
                    (LOWER(tanggal) LIKE @SearchValue");
                    parameters.Add("@SearchValue", "%" + request.SearchValue.ToLower() + "%");
                }

                var whereClause = whereConditions.Count > 0 ? "WHERE " + string.Join(" AND ", whereConditions) : "";

                query += whereClause;

                int total = 0;
                var sql_count = $"SELECT COUNT(*) FROM ({query}) as total";
                total = connection.ExecuteScalar<int>(sql_count, parameters);

                // if (!(string.IsNullOrEmpty(request.SortColumn) && string.IsNullOrEmpty(request.SortColumnDirection)))
                // {
                //     query = query + @$" ORDER BY CASE WHEN ""LastReadingAt"" IS NULL THEN 1 ELSE 0 END, ""{request.SortColumn}""" + " " + request.SortColumnDirection;
                // }
                // else
                // {
                //     query = query + @" ORDER BY CASE WHEN ""LastReadingAt"" IS NULL THEN 1 ELSE 0 END, ""DeviceStatus"" DESC, ""LastReadingAt"" DESC";
                // }

                query += @" 
                OFFSET @Skip ROWS FETCH NEXT @PageSize ROWS ONLY;";
                parameters.Add("@Skip", request.Skip);
                parameters.Add("@PageSize", request.PageSize);

                result = (await connection.QueryAsync<dynamic>(query, parameters)).ToList();

                return (result, total);
            } catch (Npgsql.NpgsqlException ex) {
                Log.Error(ex, "Sql Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data to table petak" });
                throw;
            } catch (System.Exception ex) {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data to table petak" });
                throw;
            }
        }
    }
}
