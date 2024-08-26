using Microsoft.EntityFrameworkCore;
using System.Data;
using Serilog;
using Npgsql;
using Dapper;

using IrigasiManganti.Data;
using IrigasiManganti.Models;
using System.Collections;

namespace IrigasiManganti.Repositories
{
    public interface ISchemaRepository
    {
        Task<IEnumerable<dynamic>> GetSchemaDataByDateAsync(string tanggal);
    }
    public class SchemaRepository : ISchemaRepository
    {
        private readonly IrigasiMangantiContext _context;
        private readonly string? _connectionString;
        private readonly IConfiguration _config;

        public SchemaRepository(IrigasiMangantiContext context, IConfiguration configuration)
        {
            _context = context;
            _config = configuration;
            _connectionString = _config.GetConnectionString("DefaultConnection");

            if (_connectionString == null)
            {
                Log.Error("Connection string is null. Check your configuration.");
            }

        }

        public async Task<IEnumerable<dynamic>> GetSchemaDataByDateAsync(string tanggal)
        {
            try
            {
                using var _db = new NpgsqlConnection(_connectionString);
                var query = @$"
                    SELECT p.*, di.tanggal, di.debit_aktual, di.debit_rekomendasi FROM petak p
                    LEFT JOIN debit_irigasi di ON p.id = di.petak_id
                    WHERE di.tanggal = @Tanggal::date
                ";

                // query = @"
                // SELECT 
                //         p.*, 
                //         di.tanggal, 
                //         di.debit_aktual,
                //         CASE 
                //             WHEN di.tanggal BETWEEN '2024-08-25' AND '2024-09-05' THEN 0 
                //             ELSE di.debit_rekomendasi 
                //         END AS debit_rekomendasi
                //     FROM 
                //         petak p
                //     LEFT JOIN 
                //         debit_irigasi di ON p.id = di.petak_id
                //     WHERE 
                //         di.tanggal = @Tanggal::date;

                // ";
                var results = await _db.QueryAsync<dynamic>(query, new { Tanggal = tanggal });
                return results;
            }
            catch (NpgsqlException ex)
            {
                Log.Error(ex, "PostgreSQL Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Tanggal = tanggal });
                throw;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace, Tanggal = tanggal });
                throw;
            }
        }
    }
}
