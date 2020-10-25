using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
public class UserRepository : IUserRepository
    {


        private readonly DataContext _context;
        public UserRepository(DataContext context) 
        {
            _context = context;
        }


       
        public async Task<User> GetUser(long Id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == Id);
            return user;

        }

        public async Task<bool> SaveAll()
        {
             return await _context.SaveChangesAsync()>0;
        }


    }
}