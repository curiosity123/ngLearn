using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
 public interface IUserRepository : IGenericRepository
    {
       
        Task<User> GetUser(int Id);

      
    }
}