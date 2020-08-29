using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ContentRepository : GenericRepository, IContentRepository
    {
        private const int maxItemPerLesson = 10;
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
                {
                    var memorizedIds = await _context.LearningProgresses.Where(p => p.Owner.Id == UserId && p.LearningItem.LearningSet.Id == LearningSetId && p.MemorizedLevel == true).Select(x => x.LearningItem.Id).ToListAsync();

                    var available = learningSet.LearningItems.Where(l => !memorizedIds.Contains(l.Id)).ToList();
                    List<LearningItem> rand = new List<LearningItem>();
                    while (available.Count > 0)
                    {
                        Random r = new Random();
                        int index = r.Next(0, available.Count - 1);
                        rand.Add(available[index]);
                        available.RemoveAt(index);
                        if (rand.Count > maxItemPerLesson - 1)
                            break;
                    }
                    return rand;
                }
            }
            return null;
        }

        public async Task<bool> RemoveItem(long UserId, long ItemId)
        {
            var dbItem = await _context.LearningItems.Include(x => x.LearningSet).Where(x => x.Id == ItemId).FirstOrDefaultAsync();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            if (dbItem != null && user != null)
            {

                if (dbItem.LearningSet.Author == user)
                {
                    _context.LearningItems.Remove(dbItem);
                    await _context.SaveChangesAsync();
                    return true;
                }
            }
            return false;
        }

        public async Task<bool> AddNewItem(long UserId, long LearningSetId, LearningItem Item)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            var lSet = await _context.LearningSets.FirstOrDefaultAsync(u => u.Id == LearningSetId);
            if (user != null && lSet != null && Item.LearningSet.Author.Id == UserId)
            {
                var itm = new LearningItem()
                {
                    Item = "new item",
                    SentenceWithGaps = "new sentence with gaps",
                    CorrectSentence = "new correct sentence",
                    LearningSet = lSet
                };
                _context.LearningItems.Add(itm);
                await _context.SaveChangesAsync();
            }
            return true;
        }


        public async Task<bool> UpdateItem(long UserId, LearningItem Item)
        {

            var dbItem = await _context.LearningItems.Include(x => x.LearningSet).Where(x => x.Id == Item.Id).FirstOrDefaultAsync();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            if (dbItem != null && user != null)
            {

                if (dbItem.LearningSet.Author == user)
                {

                    dbItem.CorrectSentence = Item.CorrectSentence;
                    dbItem.Description = Item.Description;
                    dbItem.SentenceWithGaps = Item.SentenceWithGaps;
                    dbItem.Item = Item.Item;
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                    return false;
            }

            return false;
        }

        public async Task<ICollection<LearningItem>> GetItemsForCourse(long UserId, long LearningSetId)
        {
            var learningSet = await _context.LearningSets.Include(x => x.LearningItems).FirstOrDefaultAsync(u => u.Id == LearningSetId);

            if (learningSet != null)
            {
                return learningSet.LearningItems;
            }
            return new List<LearningItem>();
        }

        public async Task<ICollection<LearningSet>> GetOtherLearningSets(long UserId)
        {
            List<long> usersSetsIds = await _context.UserLearningSets.Where(l => l.UserId == UserId).Select(x => x.LearningSetId).ToListAsync();
            ICollection<LearningSet> usersSets = await _context.LearningSets.Include(x => x.LearningItems).Where(x => !usersSetsIds.Contains(x.Id)).ToListAsync();
            return usersSets;
        }


        public async Task<ICollection<LearningSet>> GetUserCoursesCollection(long UserId)
        {
            ICollection<LearningSet> usersSets = await _context.LearningSets.Include(x => x.LearningItems).Where(x => x.Author.Id == UserId).ToListAsync();
            return usersSets;
        }


        public async Task<ICollection<LearningSet>> GetUserLearningSets(long UserId)
        {
            List<long> usersSetsIds = await _context.UserLearningSets.Where(l => l.UserId == UserId).Select(x => x.LearningSetId).ToListAsync();
            ICollection<LearningSet> usersSets = await _context.LearningSets.Include(x => x.LearningItems).Where(x => usersSetsIds.Contains(x.Id)).ToListAsync();
            return usersSets;
        }


        public async Task<bool> CreateCourse(LearningSet course, long UserId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            await _context.LearningSets.AddAsync(new LearningSet() { Name = course.Name, Description = course.Description, Author = user, IsPrivate = false });
            await _context.SaveChangesAsync();

            return true;
        }


        public async Task<Summary> GetProgress(long UserId, long LearningSetId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            var learningSet = await _context.LearningSets.Include(x => x.LearningItems).FirstOrDefaultAsync(u => u.Id == LearningSetId);
            if (user != null && learningSet != null)
            {
                var prog = await _context.LearningProgresses.Where(p => p.Owner == user && p.LearningItem.LearningSet.Id == LearningSetId && p.MemorizedLevel).ToListAsync();
                double percentage = (double)(((double)prog.Count / (double)learningSet.LearningItems.Count)) * 100;
                if (double.IsNaN(percentage))
                    percentage = 0;
                return new Summary() { UserId = UserId, LearningSetId = LearningSetId, ProgressInPercentage = percentage };
            }
            return new Summary() { UserId = UserId, LearningSetId = LearningSetId, ProgressInPercentage = 0 };
        }
        public async Task<bool> ResetProgress(long UserId, long LearningSetId)
        {
            var items = await _context.LearningProgresses.Where(u => u.Owner.Id == UserId && u.LearningItem.LearningSet.Id == LearningSetId).ToListAsync();
            if (items != null)
            {
                items.ForEach(x =>
                {
                    _context.LearningProgresses.Remove(x);

                });
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }


        public async Task<bool> UpdateProgress(LearningProgressDto[] progresses)
        {
            if (progresses.Length == 0)
                return false;

            foreach (var progress in progresses)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == progress.OwnerId);
                var learningItem = await _context.LearningItems.FirstOrDefaultAsync(u => u.Id == progress.LearningItemId);
                if (user != null && learningItem != null)
                {
                    var prog = await _context.LearningProgresses.Where(p => p.Owner.Id == user.Id && p.LearningItem.Id == progress.LearningItemId).FirstOrDefaultAsync();
                    if (prog != null)
                    {
                        prog.MemorizedLevel = progress.MemorizedLevel;
                        _context.LearningProgresses.Update(prog);
                    }
                    else
                        await _context.LearningProgresses.AddAsync(new LearningProgress() { Owner = user, LearningItem = learningItem, MemorizedLevel = progress.MemorizedLevel });

                }
            }
            await _context.SaveChangesAsync();
            return true;


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

        public async Task<bool> RemoveCourse(long UserId, long LearningSetId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            var ls = await _context.LearningSets.Where(x => x.Author == user && x.Id == LearningSetId).FirstOrDefaultAsync();
            if (ls != null)
            {
                _context.LearningSets.Remove(ls);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}