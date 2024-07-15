using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using IrigasiManganti.ViewModels;
using Npgsql;
using Serilog;

namespace IrigasiManganti.Repositories
{
    public interface IMasterDataRepository{
        Task<List<VMDebitBendung>> GetDataDebitBendung(VMDateRange range);
        Task<List<VMDebitIrigasi>> GetDataDebitIrigasi(VMDateRange range);
    }
    public class MasterDataRepository : IMasterDataRepository
    {
        private readonly IDbConnection _connection;
        private readonly string _connectionString;

        public MasterDataRepository(IConfiguration configuration)
        {
            this._connection = new NpgsqlConnection(configuration.GetConnectionString("DefaultConnection"));
            this._connectionString = configuration.GetConnectionString("DefaultConnection") ?? "";
        }

        public async Task<List<VMDebitBendung>> GetDataDebitBendung(VMDateRange range)
        {
            var result = new List<VMDebitBendung>();

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                try
                {
                    

                    var query = @"SELECT * FROM debit_bendung
                               WHERE tanggal >= @Start::date AND tanggal <= @End::date";

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

                    var data = await connection.QueryAsync<VMDebitBendung>(query, parameters, commandTimeout: 60);

                    result = data.ToList();

                    return result;
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

        public async Task<List<VMDebitIrigasi>> GetDataDebitIrigasi(VMDateRange range)
        {
            var result = new List<VMDebitIrigasi>();
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                try
                {
                   

                    var query = @"SELECT * FROM debit_irigasi
                               WHERE tanggal >= @Start::date AND tanggal <= @End::date";

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

                    var data = await connection.QueryAsync<VMDebitIrigasi>(query, parameters, commandTimeout : 60);

                    result = data.ToList();

                    return result;
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
    }
}