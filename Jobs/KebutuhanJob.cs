using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IrigasiManganti.Interfaces;

namespace IrigasiManganti.Jobs
{
    public interface IKebutuhanJob{
        Task InsertDataKebutuhanFromSmopi();
    }
    public class KebutuhanJob : IKebutuhanJob
    {
        private readonly IUnitOfWorkRepository _repository;
        private readonly IUnitOfWorkService _service;
        public KebutuhanJob(IUnitOfWorkRepository repository, IUnitOfWorkService service)
        {
            this._repository = repository;
            this._service = service;
        }
        
        public async Task InsertDataKebutuhanFromSmopi()
        {
            try
            {
                var data = await _service.Kebutuhan.GetKebutuhanSmopiAsync();
                if(data != null){
                    await _repository.KetersediaanRepositories.UpdateKebutuhanFromSmopiAsync(data);
                }
            }
            catch (System.Exception ex)
            {
                throw;
            }
        }
    }
}