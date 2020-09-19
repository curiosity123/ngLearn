using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public interface IAuthRepository
    {
        Task<User> Login(string username, string password);
        Task<User> Register(User user, string password);
        Task<bool> UserExists(string username);
        Task<bool> RemoveAccount(long userId);
        Task<bool> ChangePassword(long userId, string password);
    }
}