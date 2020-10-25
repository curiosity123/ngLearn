using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public interface IUserRepository
    {
        Task<User> GetUser(long Id);

        Task<bool> SaveAll();

    }
}