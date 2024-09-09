using Microsoft.EntityFrameworkCore;
using System.Data;
using Serilog;
using Npgsql;
using Dapper;

using IrigasiManganti.Data;
using IrigasiManganti.Models;
using System.Collections;
using IrigasiManganti.Models.Datatables;
using IrigasiManganti.ViewModels;

namespace IrigasiManganti.Repositories
{
    public interface IDebitBendungRepository
    {
        Task<(IReadOnlyList<dynamic>, int)> GetDatatableByRangeDateAsync2(JqueryDataTableRequestDebitBendung request);
        Task<(IReadOnlyList<dynamic>, int)> GetDatatableByRangeDateAsync(JqueryDataTableRequestDebitBendung request);
        Task<(IReadOnlyList<dynamic>, int)> GetDataAllAsync(JqueryDataTableRequest request);
        Task<(IReadOnlyList<dynamic>, int)> GetDataDebitPengambilan(JqueryDataTableRequest request);
        Task<(IReadOnlyList<dynamic>, int)> GetDataDebitHulu(JqueryDataTableRequest request);
        Task<(int, string)> SavePengambilan(DebitPengambilan model);
        Task<(int, string)> SaveHulu(DebitHulu model);
        Task<(int code, string message)> DeletePengambilan(Guid id);
        Task<(int code, string message)> DeleteHulu(Guid id);
        DebitPengambilan? GetDataPengambilanById(Guid id);
        DebitHulu? GetDataHuluById(Guid id);
        Task<(int, string)> UpdatePengambilan(DebitPengambilan model);
        Task<(int, string)> UpdateHulu(DebitHulu model);
        Task<IEnumerable<dynamic>> GetDebitPengambilan(VMDateRangeDebit range);
        Task<IEnumerable<dynamic>> GetDebitHulu(VMDateRangeDebit range);
        IEnumerable<DebitPengambilan> GetAllDebitPengambilan();
        IEnumerable<DebitHulu> GetAllDebitHulu();
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

        public async Task<(IReadOnlyList<dynamic>, int)> GetDataDebitHulu(JqueryDataTableRequest request)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                List<dynamic> result = new List<dynamic>();

                var query = $@"SELECT * FROM debit_hulu ORDER BY tanggal DESC";

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
                    (LOWER(tanggal) LIKE @SearchValue OR
                    LOWER(nilai) LIKE @SearchValue OR
                    LOWER(satuan) LIKE @SearchValue OR
                    LOWER(update) LIKE @SearchValue");
                    parameters.Add("@SearchValue", "%" + request.SearchValue.ToLower() + "%");
                }

                var whereClause = whereConditions.Count > 0 ? "WHERE " + string.Join(" AND ", whereConditions) : "";

                query += whereClause;

                int total = 0;
                var sql_count = $"SELECT COUNT(*) FROM ({query}) as total";
                total = connection.ExecuteScalar<int>(sql_count, parameters);

                query += @" 
                OFFSET @Skip ROWS FETCH NEXT @PageSize ROWS ONLY;";
                parameters.Add("@Skip", request.Skip);
                parameters.Add("@PageSize", request.PageSize);

                result = (await connection.QueryAsync<dynamic>(query, parameters)).ToList();

                return (result, total);
            }
            catch (Npgsql.NpgsqlException ex)
            {
                Log.Error(ex, "Sql Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data to table petak" });
                throw;
            }
            catch (System.Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data to table petak" });
                throw;
            }
        }

        public async Task<(IReadOnlyList<dynamic>, int)> GetDataDebitPengambilan(JqueryDataTableRequest request)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                List<dynamic> result = new List<dynamic>();

                var query = $@"SELECT * FROM debit_pengambilan ORDER BY tanggal DESC";

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
                    (LOWER(tanggal) LIKE @SearchValue OR
                    LOWER(nilai) LIKE @SearchValue OR
                    LOWER(satuan) LIKE @SearchValue OR
                    LOWER(update) LIKE @SearchValue");
                    parameters.Add("@SearchValue", "%" + request.SearchValue.ToLower() + "%");
                }

                var whereClause = whereConditions.Count > 0 ? "WHERE " + string.Join(" AND ", whereConditions) : "";

                query += whereClause;

                int total = 0;
                var sql_count = $"SELECT COUNT(*) FROM ({query}) as total";
                total = connection.ExecuteScalar<int>(sql_count, parameters);

                query += @" 
                OFFSET @Skip ROWS FETCH NEXT @PageSize ROWS ONLY;";
                parameters.Add("@Skip", request.Skip);
                parameters.Add("@PageSize", request.PageSize);

                result = (await connection.QueryAsync<dynamic>(query, parameters)).ToList();

                return (result, total);
            }
            catch (Npgsql.NpgsqlException ex)
            {
                Log.Error(ex, "Sql Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data to table petak" });
                throw;
            }
            catch (System.Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data to table petak" });
                throw;
            }
        }

        public DebitPengambilan? GetDataPengambilanById(Guid id)
        {
            // Guid userId = _context.OrganizationHasUsers.Where(x => x.Id == Id).Select(x => x.UserId).FirstOrDefault();
            return _context.DebitPengambilans.Where(x => x.Id == id).FirstOrDefault();
        }

        public DebitHulu? GetDataHuluById(Guid id)
        {
            // Guid userId = _context.OrganizationHasUsers.Where(x => x.Id == Id).Select(x => x.UserId).FirstOrDefault();
            return _context.DebitHulus.Where(x => x.Id == id).FirstOrDefault();
        }

        public async Task<(int, string)> SaveHulu(DebitHulu model) {
            int code = 500;
            string message = "";
            try {
                model.Update = DateTime.Now;
                await _context.DebitHulus.AddAsync(model);
                await _context.SaveChangesAsync();

                code = 200;
                message = "Data berhasil ditambahkan";
            } catch (NpgsqlException ex) {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                code = 500;
                message = ex.Message;
            } catch (System.Exception ex) {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                throw;
            }

            return (code, message);
        }

        public async Task<(int, string)> SavePengambilan(DebitPengambilan model) {
            int code = 500;
            string message = "";
            try {
                model.Update = DateTime.Now;
                await _context.DebitPengambilans.AddAsync(model);
                await _context.SaveChangesAsync();

                code = 200;
                message = "Data berhasil ditambahkan";
            } catch (NpgsqlException ex) {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                code = 500;
                message = ex.Message;
            } catch (System.Exception ex) {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                throw;
            }

            return (code, message);
        }

        public async Task<(int, string)> UpdatePengambilan(DebitPengambilan model)
        {
            int code = 500;
            string message = "";
            try
            {
                var data = GetDataPengambilanById(model.Id);

                if (data != null)
                {
                    data.Nilai = model.Nilai;
                    data.Satuan = model.Satuan;
                    _context.DebitPengambilans.Update(data);
                    await _context.SaveChangesAsync();

                    code = 200;
                    message = "Data berhasil diperbaharui";
                }
                else
                {
                    code = 404;
                    message = "Data tidak ditemukan";
                }
            }
            catch (NpgsqlException ex)
            {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                code = 500;
                message = ex.Message;
            }
            catch (System.Exception ex)
            {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                throw;
            }

            return (code, message);
        }

        public async Task<(int, string)> UpdateHulu(DebitHulu model)
        {
            int code = 500;
            string message = "";
            try
            {
                var data = GetDataHuluById(model.Id);

                if (data != null)
                {
                    data.Nilai = model.Nilai;
                    data.Satuan = model.Satuan;
                    data.NilaiCihaur = model.NilaiCihaur;
                    data.NilaiSidareja = model.NilaiSidareja;
                    data.NilaiLakbok = model.NilaiLakbok;
                    _context.DebitHulus.Update(data);
                    _context.SaveChanges();

                    code = 200;
                    message = "Data berhasil diperbaharui";
                }
                else
                {
                    code = 404;
                    message = "Data user tidak ditemukan";
                }
            }
            catch (NpgsqlException ex)
            {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                code = 500;
                message = ex.Message;
            }
            catch (System.Exception ex)
            {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                throw;
            }

            return (code, message);
        }

        public async Task<(int code, string message)> DeletePengambilan(Guid id)
        {
            var data = await _context.DebitPengambilans.FindAsync(id);
            if (data == null)
            {
                return (404, "Petak not found");
            }

            _context.DebitPengambilans.Remove(data);
            await _context.SaveChangesAsync();

            return (200, "Debit deleted successfully");
        }

        public async Task<(int code, string message)> DeleteHulu(Guid id)
        {
            var data = await _context.DebitHulus.FindAsync(id);
            if (data == null)
            {
                return (404, "Petak not found");
            }

            _context.DebitHulus.Remove(data);
            await _context.SaveChangesAsync();

            return (200, "Debit deleted successfully");
        }

        public async Task<IEnumerable<dynamic>> GetDebitPengambilan(VMDateRangeDebit range)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                try
                {
                    var query = @"SELECT 
                            id,
                            tanggal::date AS tgl,
                            nilai,
                            satuan,
                            update 
                        FROM 
                            debit_pengambilan 
                        WHERE 
                            to_char(tanggal, 'YYYY-MM-DD') BETWEEN @Start AND @End ORDER BY tanggal DESC";

                    if (range.end < range.start) range.end = range.start;

                    if (!range.start.HasValue && !range.end.HasValue)
                    {
                        range.start = DateOnly.FromDateTime(DateTime.Now);
                        range.end = DateOnly.FromDateTime(DateTime.Now.AddMonths(1));
                    }

                    var parameters = new
                    {
                        Start = range.start,
                        End = range.end
                    };

                    var data = await connection.QueryAsync<dynamic>(query, parameters, commandTimeout: 60);
                    return data;
                }
                catch (Npgsql.NpgsqlException ex)
                {

                    Log.Error(ex, "Sql Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data to table debit_irigasi" });
                    throw;
                }
                catch (System.Exception ex)
                {

                    Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data to table debit_irigasi" });
                    throw;
                }
                finally
                {

                }
            }
        }

        public async Task<IEnumerable<dynamic>> GetDebitHulu(VMDateRangeDebit range)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                try
                {
                    var query = @"SELECT 
                            id,
                            tanggal::date AS tgl,
                            nilai,
                            satuan,
                            update 
                        FROM 
                            debit_hulu
                        WHERE 
                            to_char(tanggal, 'YYYY-MM-DD') BETWEEN @Start AND @End ORDER BY tanggal DESC";

                    if (range.end < range.start) range.end = range.start;

                    if (!range.start.HasValue && !range.end.HasValue)
                    {
                        range.start = DateOnly.FromDateTime(DateTime.Now);
                        range.end = DateOnly.FromDateTime(DateTime.Now.AddMonths(1));
                    }

                    var parameters = new
                    {
                        Start = range.start,
                        End = range.end
                    };

                    var data = await connection.QueryAsync<dynamic>(query, parameters, commandTimeout: 60);
                    return data;
                }
                catch (Npgsql.NpgsqlException ex)
                {

                    Log.Error(ex, "Sql Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data to table debit_irigasi" });
                    throw;
                }
                catch (System.Exception ex)
                {

                    Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data to table debit_irigasi" });
                    throw;
                }
                finally
                {

                }
            }
        }

        public IEnumerable<DebitPengambilan> GetAllDebitPengambilan()
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                string query = @"SELECT * FROM debit_pengambilan ORDER BY tanggal DESC";
                var result = connection.Query<DebitPengambilan>(query);
                return result;
            }
            catch (NpgsqlException ex)
            {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace});
                throw;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace});
                throw;
            }
        }

        public IEnumerable<DebitHulu> GetAllDebitHulu()
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                string query = @"SELECT nilai,tanggal ,satuan , update , nilai_sidareja AS NilaiSidareja, nilai_cihaur AS NilaiCihaur,nilai_lakbok AS NilaiLakbok FROM debit_hulu ORDER BY tanggal DESC";
                var result = connection.Query<DebitHulu>(query);
                return result;
            }
            catch (NpgsqlException ex)
            {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace});
                throw;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace});
                throw;
            }
        }
    }
}
