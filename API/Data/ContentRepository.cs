using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ContentRepository : GenericRepository, IContentRepository
    {

        private readonly DataContext _context;
        public ContentRepository(DataContext context) : base(context)
        {
            _context = context;
        }








        public async Task<bool> AddLearningSetToUser(long UserId, long LearningSetId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            var learningSet = await _context.LearningSets.FirstOrDefaultAsync(u => u.Id == LearningSetId);
            if (user != null && learningSet != null)
            {
                _context.UserLearningSets.Add(new UserLearningSet() { User = user, LearningSet = learningSet });
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<ICollection<LearningItem>> GetNewLessonItems(long UserId, long LearningSetId)
        {
            var ls = await _context.UserLearningSets.Where(x => x.UserId == UserId && x.LearningSetId == LearningSetId).FirstOrDefaultAsync();
            if (ls != null)
            {
                var learningSet = await _context.LearningSets.Include(x => x.LearningItems).FirstOrDefaultAsync(u => u.Id == LearningSetId);
                if (learningSet != null)
                    return learningSet.LearningItems.Take(10).ToList();
            }
            return null;
        }

        public async Task<ICollection<LearningSet>> GetOtherLearningSets(long UserId)
        {
            List<long> usersSetsIds = await _context.UserLearningSets.Where(l => l.UserId != UserId).Select(x => x.LearningSetId).ToListAsync();
            ICollection<LearningSet> usersSets = await _context.LearningSets.Include(x => x.LearningItems).Where(x => usersSetsIds.Contains(x.Id)).ToListAsync();
            return usersSets;
        }

        public async Task<ICollection<LearningSet>> GetUserLearningSets(long UserId)
        {
            List<long> usersSetsIds = await _context.UserLearningSets.Where(l => l.UserId == UserId).Select(x => x.LearningSetId).ToListAsync();
            ICollection<LearningSet> usersSets = await _context.LearningSets.Include(x => x.LearningItems).Where(x => usersSetsIds.Contains(x.Id)).ToListAsync();
            return usersSets;
        }

        public Task<Summary> GetSummaryForLearningSets(long LearningSetId)
        {
            throw new System.NotImplementedException();
        }



        public async Task<bool> RemoveLearningSetToUser(long UserId, long LearningSetId)
        {
            var ls = await _context.UserLearningSets.Where(x => x.UserId == UserId && x.LearningSetId == LearningSetId).FirstOrDefaultAsync();
            if (ls != null)
            {
                _context.UserLearningSets.Remove(ls);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}