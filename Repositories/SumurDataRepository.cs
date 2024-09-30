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
    public interface ISumurDataRepository
    {
        Task<(IReadOnlyList<dynamic>, int)> GetDataSumur(JqueryDataTableRequest request);
        Task<IReadOnlyList<dynamic>> GetDataPointSumur();
        Sumur? GetSumurByID(Guid id);
        Sumur? GetSumurByCode(string code);
        Task<(int, string)> SaveSumur(Sumur model);
        Task<(int code, string message)> DeleteSumur(Guid id);
       Task<List<Sumur>> GetTopSumur();



    }
    public class SumurDataRepository : ISumurDataRepository
    {
        private readonly IDbConnection _connection;
        private readonly string _connectionString;
        private readonly IrigasiMangantiContext _context;

        public SumurDataRepository(IConfiguration configuration, IrigasiMangantiContext context)
        {
            _context = context;
            this._connection = new NpgsqlConnection(configuration.GetConnectionString("DefaultConnection"));
            this._connectionString = configuration.GetConnectionString("DefaultConnection") ?? "";
        }

        public Sumur? GetSumurByID(Guid id)
        {
            // Guid userId = _context.OrganizationHasUsers.Where(x => x.Id == Id).Select(x => x.UserId).FirstOrDefault();
            return _context.Sumurs.Where(x => x.Id == id).FirstOrDefault();
        }

        public async Task<(int, string)> SaveSumur(Sumur model)
        {
            int code = 500;
            string message = "";
            try
            {
                if (model.Id == Guid.Empty)
                {
                    bool isExist = _context.Sumurs.Where(x => x.Code == model.Code).Any();

                    if (isExist)
                    {
                        message = "Data sudah ada";
                        return (code, message);
                    }

                    // model.Id = Guid.NewGuid();   
                    await _context.Sumurs.AddAsync(model);
                    await _context.SaveChangesAsync();

                    code = 200;
                    message = "Data berhasil ditambahkan";
                }
                else
                {
                    var data = GetSumurByID(model.Id);

                    if (data != null)
                    {
                        data.Alamat = model.Alamat;
                        data.Code = model.Code;
                        data.SumberEnergi = model.SumberEnergi;
                        data.Latitude = model.Latitude;
                        data.Longitude = model.Longitude;
                        data.TahunPengeboran = model.TahunPengeboran;
                        data.TahunRehab = model.TahunRehab;
                        data.TahunPerbaikanJiat = model.TahunPerbaikanJiat;
                        data.TahunPerbaikanMesin = model.TahunPerbaikanMesin;
                        data.KedalamanBor = model.KedalamanBor;
                        data.DebitSumur = model.DebitSumur;
                        data.KondisiSumur = model.KondisiSumur;
                        data.KondisiMesin = model.KondisiMesin;
                        data.KondisiPompa = model.KondisiPompa;
                        data.KondisiRumahPompa = model.KondisiRumahPompa;
                        data.IrigasiPipaSaluran = model.IrigasiPipaSaluran;
                        data.IrigasiBoxPembagi = model.IrigasiBoxPembagi;
                        data.FungsiAirBaku = model.FungsiAirBaku;
                        data.FungsiIrigasi = model.FungsiIrigasi;
                        data.Status = model.Status;
                        data.Note = model.Note;

                        _context.Sumurs.Update(data);
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
        public async Task<(IReadOnlyList<dynamic>, int)> GetDataSumur(JqueryDataTableRequest request)

        {
            try
            {
                using var connection = new NpgsqlConnection(_connectionString);
                List<dynamic> result = new List<dynamic>();

                var query = $@"SELECT 
                    *
                    FROM 
                    data_sumur 
                    ";

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
                    LOWER(jenis_bangunan) LIKE @SearchValue)");
                    parameters.Add("@SearchValue", "%" + request.SearchValue.ToLower() + "%");
                }

                var whereClause = whereConditions.Count > 0 ? "WHERE" + string.Join(" AND ", whereConditions) : "";

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
      
        public async Task<(int code, string message)> DeleteSumur(Guid id)
        {
            var model = await _context.Sumurs.FindAsync(id);
            if (model == null)
            {
                return (404, "data not found");
            }

            _context.Sumurs.Remove(model);
            await _context.SaveChangesAsync();

            return (200, "data deleted successfully");
        }

        public  async Task<List<Sumur>> GetTopSumur()
        {
           try {
             using var connection = new NpgsqlConnection(_connectionString);
                var query = $@"SELECT code, kedalaman_bor as kedalamanBor, debit_sumur as debitSumur,status FROM data_sumur LIMIT 5";
                var results = await connection.QueryAsync<Sumur>(query);

                return results.ToList();
                    
            }  catch (NpgsqlException ex)
            {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                throw;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                throw;
            }
        }

        public  async Task<IReadOnlyList<dynamic>> GetDataPointSumur()
        {
              try {
             using var connection = new NpgsqlConnection(_connectionString);
                var query = $@"SELECT latitude,longitude,code, kedalaman_bor , debit_sumur,tahun_pengeboran ,status FROM data_sumur order by code desc";
                var results = await connection.QueryAsync<dynamic>(query);

                return results.ToList();
                    
            }  catch (NpgsqlException ex)
            {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                throw;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                throw;
            }
        }

        public Sumur? GetSumurByCode(string code)
        {
            return _context.Sumurs.Where(x => x.Code == code).FirstOrDefault();
        }
    }
}