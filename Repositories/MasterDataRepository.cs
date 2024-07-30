using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using IrigasiManganti.Data;
using IrigasiManganti.Models;
using IrigasiManganti.Models.Datatables;
using IrigasiManganti.ViewModels;
using Npgsql;
using Serilog;

namespace IrigasiManganti.Repositories
{
    public interface IMasterDataRepository{
        Task<IEnumerable<dynamic>> GetDataDebitBendung(VMDateRange range);
        Task<IEnumerable<dynamic>> GetDataDebitIrigasi(VMDateRange range);
        Task<(IReadOnlyList<dynamic>, int)> GetDataPetak(JqueryDataTableRequest request);
        Task<(IReadOnlyList<dynamic>, int)> GetDataKebutuhan(JqueryDataTableRequestKebutuhan request);
        Task<(int code, string message)> DeletePetak(Guid id);
        MasterPetak? GetDataPetakById(Guid id);
        Task<(int, string)> SavePetak(MasterPetak model);
    }
    public class MasterDataRepository : IMasterDataRepository
    {
        private readonly IDbConnection _connection;
        private readonly string _connectionString;
        private readonly IrigasiMangantiContext _context;

        public MasterDataRepository(IConfiguration configuration, IrigasiMangantiContext context)
        {
            _context = context;
            this._connection = new NpgsqlConnection(configuration.GetConnectionString("DefaultConnection"));
            this._connectionString = configuration.GetConnectionString("DefaultConnection") ?? "";
        }

        public MasterPetak? GetDataPetakById(Guid id)
        {
            // Guid userId = _context.OrganizationHasUsers.Where(x => x.Id == Id).Select(x => x.UserId).FirstOrDefault();
            return _context.MasterPetaks.Where(x => x.Id == id).FirstOrDefault();
        }

        public async Task<(int, string)> SavePetak(MasterPetak model) {
            int code = 500;
            string message = "";
            try {
                if (model.Id == Guid.Empty) {
                    bool isExist = _context.MasterPetaks.Where(x => x.Id == model.Id).Any();

                    if (isExist) {
                        message = "Data sudah ada";
                        return (code, message);
                    }

                    model.Id = Guid.NewGuid();
                    await _context.MasterPetaks.AddAsync(model);
                    await _context.SaveChangesAsync();

                    code = 200;
                    message = "Data berhasil ditambahkan";
                } else {
                    var data = GetDataPetakById(model.Id);

                    if (data != null) {
                        data.NamaPetak = model.NamaPetak;
                        data.JenisBangunan = model.JenisBangunan;
                        data.Luas = model.Luas;
                        data.DebitKebutuhan = model.DebitKebutuhan;
                        _context.MasterPetaks.Update(data);
                        _context.SaveChanges();

                        code = 200;
                        message = "Data berhasil diperbaharui";
                    } else {
                        code = 404;
                        message = "Data user tidak ditemukan";
                    }
                }
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

        public async Task<IEnumerable<dynamic>> GetDataDebitBendung(VMDateRange range)
        {
            
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                try
                {
                    var query = @"SELECT 
                                    id,
                                    TO_CHAR(tanggal, 'YYYY-MM-DD') as tanggal,
                                    ketersediaan_min,
                                    ketersediaan_max,
                                    ketersediaan_avg,
                                    kebutuhan
                                FROM debit_bendung
                                WHERE tanggal >= @Start::date AND tanggal <= @End::date
                                ORDER BY tanggal";

                    if (range.end < range.start) range.end = range.start;

                    if (!range.start.HasValue && !range.end.HasValue)
                    {
                        range.start = DateOnly.FromDateTime(DateTime.Now);
                        range.end = DateOnly.FromDateTime(DateTime.Now.AddMonths(6));
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

                    Log.Error(ex, "Sql Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data to table debit_bendung" });
                    throw;
                }
                catch (System.Exception ex)
                {

                    Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while get data to table debit_bendung" });
                    throw;
                }
                finally
                {
                    
                }

            }
        }

        public async Task<(IReadOnlyList<dynamic>, int)> GetDataPetak(JqueryDataTableRequest request) {
            try {
                using var connection = new NpgsqlConnection(_connectionString);
                List<dynamic> result = new List<dynamic>();

                var query = $@"SELECT 
                    p.id,
                    p.nama_petak AS ""namaPetak"",
                    p.jenis_bangunan AS ""jenisBangunan"",
                    p.luas,
                    p.debit_kebutuhan AS ""debitKebutuhan"",
                    p.location,
                    bg.nama_bangunan AS ""namaBangunan""
                FROM 
                    petak AS p 
                    LEFT JOIN bangunan AS bg ON p.bangunan_id = bg.id";

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
                    (LOWER(nama_petak) LIKE @SearchValue OR
                    LOWER(jenis_bangunan) LIKE @SearchValue OR
                    LOWER(luas) LIKE @SearchValue OR
                    LOWER(debit_kebutuhan) LIKE @SearchValue OR
                    LOWER(location) LIKE @SearchValue OR
                    LOWER(nama_bangunan) LIKE @SearchValue)");
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



        public async Task<(int code, string message)> DeletePetak(Guid id)
        {
            var petak = await _context.MasterPetaks.FindAsync(id);
            if (petak == null)
            {
                return (404, "Petak not found");
            }

            _context.MasterPetaks.Remove(petak);
            await _context.SaveChangesAsync();

            return (200, "Petak deleted successfully");
        }

        public async Task<IEnumerable<dynamic>> GetDataDebitIrigasi(VMDateRange range)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                try
                {
                    var query = @"SELECT
                                    p.id,
                                    TO_CHAR(di.tanggal, 'YYYY-MM-DD') as tanggal,
                                    p.nama_petak,
                                    p.jenis_bangunan,
                                    p.luas,
                                    p.debit_kebutuhan,
                                    di.debit_aktual,
                                    di.debit_rekomendasi,
                                    TO_CHAR(di.updated_at, 'YYYY-MM-DD HH:mm:ss') as updated_at
                                    
                                FROM
                                    debit_irigasi AS di
                                    JOIN petak AS P ON di.petak_id = P.ID
                                WHERE tanggal >= @Start::date AND tanggal <= @End::date
                                ORDER BY di.tanggal";

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

                    var data = await connection.QueryAsync<dynamic>(query, parameters, commandTimeout : 60);
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

        public async Task<(IReadOnlyList<dynamic>, int)> GetDataKebutuhan(JqueryDataTableRequestKebutuhan request)
        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                List<dynamic> result = new List<dynamic>();

                var query = @"
                    SELECT
                        * 
                    FROM
                        (
                        SELECT
                            tanggal :: DATE,
                            EXTRACT ( YEAR FROM tanggal ) :: INTEGER AS tahun,
                            EXTRACT ( MONTH FROM tanggal ) :: INTEGER AS bulan,
                        CASE
                            WHEN EXTRACT ( DAY FROM tanggal ) < 16 THEN
                            1 ELSE 2 
                        END AS periode,
                        ketersediaan_min,
                        ketersediaan_max,
                        ketersediaan_avg,
                        kebutuhan,
                        updated_at 
                        FROM
                            ""debit_bendung"" 
                        ORDER BY tanggal
                        ) AS data_kebutuhan 
                    WHERE
                        tahun = @Tahun
                        AND bulan = @Bulan 
                        AND periode = @Periode";

                var parameters = new DynamicParameters();
                var whereConditions = new List<string>();

                parameters.Add("Tahun", request.Year);
                parameters.Add("Bulan", request.Month);
                parameters.Add("Periode", request.Periode);

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
                    LOWER(tahun) LIKE @SearchValue OR
                    LOWER(bulan) LIKE @SearchValue OR
                    LOWER(periode) LIKE @SearchValue 
                   ");
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
    }
}