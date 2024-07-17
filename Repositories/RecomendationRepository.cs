using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Hangfire.Server;
using Npgsql;
using Serilog;

using Dapper;
using DocumentFormat.OpenXml.Wordprocessing;
using IrigasiManganti.ViewModels;
using IrigasiManganti.Interfaces;

namespace IrigasiManganti.Repositories
{
    public interface IRecomendationRepository{
        Task SaveRecomendationDataAsync(List<VMRecomendation> data, string filePath, PerformContext context);
        Guid? GetPetakIdByPetakForecastName(string forecastName);
    }
    public class RecomendationRepository : IRecomendationRepository
    {
        private string _connectionString;

        public RecomendationRepository(IConfiguration configuration)
        {
            this._connectionString = configuration.GetConnectionString("DefaultConnection") ?? "";
        }

        public async Task SaveRecomendationDataAsync(List<VMRecomendation> data, string filePath, PerformContext context)
        {
            string jobId = context.BackgroundJob.Id;
            
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                bool isSuccess = false;
                await connection.OpenAsync();
                using (var transaction = await connection.BeginTransactionAsync())
                {
                    try
                    {
                        var tempTableName = "debit_irigasi_temp";

                        // Step 1: Create a temporary table
                        await connection.ExecuteAsync($@"
                    CREATE TEMP TABLE {tempTableName} (
                        petak_id UUID,
                        tanggal DATE,
                        debit_rekomendasi DOUBLE PRECISION,
                        updated_at TIMESTAMP
                    ) ON COMMIT DROP;", transaction: transaction);

                        // Step 2: Copy data into the temporary table
                        using (var writer = connection.BeginBinaryImport($"COPY {tempTableName} (petak_id, tanggal, debit_rekomendasi, updated_at) FROM STDIN (FORMAT BINARY)"))
                        {
                            foreach (var item in data)
                            {
                                writer.StartRow();
                                writer.Write(item.id_petak);
                                writer.Write(item.tanggal);
                                writer.Write(item.debit_rekomendasi);
                                writer.Write(item.updated_at);
                            }
                            await writer.CompleteAsync();
                        }

                        // Step 3: Upsert from the temporary table to the target table
                        var targetTableName = "debit_irigasi";
                        await connection.ExecuteAsync($@"
                                        INSERT INTO {targetTableName} (petak_id, tanggal, debit_rekomendasi, updated_at)
                                        SELECT petak_id, tanggal, debit_rekomendasi, updated_at FROM {tempTableName}
                                        ON CONFLICT (petak_id, tanggal) DO UPDATE 
                                        SET debit_rekomendasi = EXCLUDED.debit_rekomendasi, updated_at = EXCLUDED.updated_at;", transaction: transaction);

                        await transaction.CommitAsync();

                        isSuccess = true;
                    }
                    catch(Npgsql.NpgsqlException ex){
                        await transaction.RollbackAsync();
                        Log.Error(ex, "Sql Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while insert data to table debit_irigasi" });
                        throw;
                    }   
                    catch (System.Exception ex)
                    {
                       await transaction.RollbackAsync();
                        Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while insert data to table debit_irigasi" });
                        throw;
                    }
                    finally{
                        try
                        {
                            string query = @"INSERT INTO forecast_rekomendasi (id,updated_at,file_path,status,job_id)
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
                        catch (Npgsql.NpgsqlException ex){
                            await transaction.RollbackAsync();
                            Log.Error(ex, "Sql Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while insert data to table forecast_rekomendasi" });
                            throw;
                        }
                        catch (System.Exception ex)
                        {
                            await transaction.RollbackAsync();
                            Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while insert data to table forecast_rekomendasi" });
                            throw;
                        }

                        await connection.CloseAsync();
                    }
                    
                }

                await connection.CloseAsync();
            }

        }

        public Guid? GetPetakIdByPetakForecastName(string forecastName){
            try
            {
                using (var connection = new NpgsqlConnection(_connectionString)){
                    string query = @"SELECT id FROM petak WHERE nama_petak_forecast = @forecastName";
                    var data = connection.QueryFirstOrDefault<Guid>(query, new { forecastName });
                    return data;
                }
                    
            }
            catch(NpgsqlException ex){
                Log.Error(ex, "Sql Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while try to get id from table petak" });
                throw;
            }
            catch (System.Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while try to get id from table petak" });
                throw;
            }
        }

        private async Task<string> SaveFileAsync(IFormFile file, string uploadDirectory)
        {
            try
            {
                EnsureDirectoryExists(uploadDirectory);

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                fileName = $"{DateTime.Now.ToString("dd/MMM/YYYY")}_{fileName}"; ;
                var filePath = Path.Combine(uploadDirectory, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                return filePath;
            }
            catch (System.Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Desc = "Error while try to save file rekomendasi to folder" });
                throw;
                throw;
            }
            
        }

        private void EnsureDirectoryExists(string directory)
        {
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
        }
    }
}