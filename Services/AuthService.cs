using IrigasiManganti.Interfaces;
using IrigasiManganti.Repositories;
using IrigasiManganti.Models.Customs;
using IrigasiManganti.ViewModels;

using Serilog;

namespace IrigasiManganti.Services
{
    public interface IAuthService
    {
        Task<ApiResponse> verifyLogin(VMLogin model);
    }
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWorkRepository _unitOfWorkRepository;

        public AuthService(IUnitOfWorkRepository unitOfWorkRepository)
        {
            _unitOfWorkRepository = unitOfWorkRepository;
        }
        
        public async Task<ApiResponse> verifyLogin(VMLogin model)
        {
            var result = new ApiResponse();

            try
            {
                var user = await _unitOfWorkRepository.Users.GetAuthByUsername(model.Username);

                if(user == null) {
                    result.MetaData.Code = 404;
                    result.MetaData.Message = $"User with username {model.Username} is not registered";
                    result.Response = null;
                } else {
                    bool isCorrectPassword = BCrypt.Net.BCrypt.Verify(model.Password, user.Password);
                    if (isCorrectPassword) {
                        result.MetaData.Code = 200;
                        result.MetaData.Message = "OK";
                        result.Response = user;
                    } else {
                        result.MetaData.Code = 401;
                        result.MetaData.Message = "Your password entered is incorrect";
                        result.Response = null;
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "General Exception: {@ExceptionDetails}", new { ex.Message, ex.StackTrace });
                result.MetaData.Code = 500;
                result.MetaData.Message = "Sorry, something went wrong. Please try again later or contact administrator.";
                result.Response = null;
            }

            return result;
        }
    }
}
