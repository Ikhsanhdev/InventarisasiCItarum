using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Hangfire.Server;
using IrigasiManganti.ViewModels;
using Npgsql;
using Serilog;

namespace IrigasiManganti.Repositories
{
    public interface IKetersediaanResository
    {
        Task SaveKetersediaanDataAsync(List<VMKetersediaan> data, string filePath, PerformContext context);
    }
    public class KetersediaanRepository : IKetersediaanResository
    {
        private string _connectionString;

        public KetersediaanRepository(IConfiguration configuration)
        {
            this._connectionString = configuration.GetConnectionString("DefaultConnection") ?? ""; ;
        }
        public async Task SaveKetersediaanDataAsync(List<VMKetersediaan> data, string filePath, PerformContext context)
        {
            string jobId = context.BackgroundJob.Id;

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                bool isSuccess = false;
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        var sql = @"
                        INSERT INTO debit_bendung (tanggal, ketersediaan_min, ketersediaan_max, ketersediaan_avg) 
                        VALUES (@tanggal, @ketersediaan_min, @ketersediaan_max, @ketersediaan_avg)
                        ON CONFLICT (tanggal) DO UPDATE 
                        SET 
                            ketersediaan_min = EXCLUDED.ketersediaan_min,
                            ketersediaan_max = EXCLUDED.ketersediaan_max,
                            ketersediaan_avg = EXCLUDED.ketersediaan_avg
                        ";

                        await connection.ExecuteAsync(sql, data, transaction: transaction);
                        await transaction.CommitAsync();
                        isSuccess = true;
                    }
                    catch (Npgsql.NpgsqlException ex)
                    {
                        await transaction.RollbackAsync();
                        Log.Error(ex, "Sql Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while insert data to table debit_bendung" });
                        throw;
                    }
                    catch (System.Exception ex)
                    {
                        await transaction.RollbackAsync();
                        Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while insert data to table debit_bendung" });
                        throw;
                    }
                    finally
                    {
                        try
                        {
                            string query = @"INSERT INTO forecast_ketersediaan (id,updated_at,file_path,status,job_id)
                                        VALUES(@id, @updated_at, @file_path, @status, @job_id)";


                            var parameter = new
                            {
                                id = Guid.NewGuid(),
                                updated_at = DateTime.Now,
                                file_path = filePath,
                                status = isSuccess,
                                job_id = jobId
                            };
                            await connection.ExecuteAsync(query, parameter);

                            await transaction.CommitAsync();
                        }
                        catch (Npgsql.NpgsqlException ex)
                        {
                            await transaction.RollbackAsync();
                            Log.Error(ex, "Sql Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while insert data to table forecast_ketersediaan" });
                            throw;
                        }
                        catch (System.Exception ex)
                        {
                            await transaction.RollbackAsync();
                            Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while insert data to table forecast_ketersediaan" });
                            throw;
                        }

                        await connection.CloseAsync();
                    }
                }

            }
        }

    }
}