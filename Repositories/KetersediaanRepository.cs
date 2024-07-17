using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using DocumentFormat.OpenXml.Office2010.Excel;
using Hangfire.Server;
using IrigasiManganti.ViewModels;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Npgsql;
using Serilog;

namespace IrigasiManganti.Repositories
{
    public interface IKetersediaanResository
    {
        Task SaveKetersediaanDataAsync(List<VMKetersediaan> data, string filePath, string jobId);
    }
    public class KetersediaanRepository : IKetersediaanResository
    {
        private string _connectionString;

        public KetersediaanRepository(IConfiguration configuration)
        {
            this._connectionString = configuration.GetConnectionString("DefaultConnection") ?? ""; ;
        }
        public async Task SaveKetersediaanDataAsync(List<VMKetersediaan> data, string filePath, string jobId)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                bool isSuccess = false;
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        /* check if data with tanggal exisi */
                        
                        foreach (var row in data)
                        {
                            var currentRow = "SELECT COUNT(*) FROM debit_bendung WHERE tanggal::date = @tanggal::date";
                            var count = await connection.QueryAsync<dynamic>(currentRow, new {row.tanggal});
                            var x = count.ToList().Count;
                            var parameters = new {
                                row.id,
                                row.tanggal,
                                row.ketersediaan_min,
                                row.ketersediaan_max,
                                row.ketersediaan_avg,
                                row.updated_at
                            };
                            if(x == 0){
                                /* Insert Data*/
                                var insertQuery = @"INSERT INTO debit_bendung 
                                                    (id, tanggal, ketersediaan_min, ketersediaan_max, ketersediaan_avg, updated_at) 
                                                    VALUES (@id, @tanggal, @ketersediaan_min, @ketersediaan_max, @ketersediaan_avg, @updated_at)";
                                await connection.QueryAsync(insertQuery, parameters);
                                Console.WriteLine("INSERT NEW debit_bendung");
                            }else{
                                var parameterUpdate = new
                                {
                                    row.ketersediaan_min,
                                    row.ketersediaan_max,
                                    row.ketersediaan_avg,
                                    row.updated_at,
                                    row.tanggal
                                };
                                var updateQuery = @"UPDATE debit_bendung 
                                                    SET
                                                        ketersediaan_min = @ketersediaan_min,
                                                        ketersediaan_max = @ketersediaan_max,
                                                        ketersediaan_avg = @ketersediaan_avg,
                                                        updated_at = @updated_at
                                                    WHERE tanggal::date = @tanggal::date";
                                await connection.QueryAsync(updateQuery, parameterUpdate);
                                Console.WriteLine($"UPDATE debit_bendung ------------ tangaal: {row.tanggal}");
                            }
                        }
    
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

                await connection.CloseAsync();
            }
        }

    }
}