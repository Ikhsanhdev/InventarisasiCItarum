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
        Task<IEnumerable<dynamic>> GetDataDebitBendung(VMDateRange range);
        Task<IEnumerable<dynamic>> GetDataDebitIrigasi(VMDateRange range);
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
    }
}