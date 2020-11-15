using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Dto;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ContentRepository : IContentRepository
    {
        private readonly DataContext _context;
        private readonly IMapper mapper;
        public ContentRepository(DataContext context, IMapper mapper)
        {
            this.mapper = mapper;
            _context = context;
        }


// userBoard repository
        public async Task<ICollection<LearningItem>> GetNewLessonItems(long UserId, long LearningSetId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Id == UserId);
            if (user != null)
            {
                var ls = await _context.UserLearningSets.Where(x => x.UserId == UserId && x.LearningSetId == LearningSetId).FirstOrDefaultAsync();
                if (ls != null)
                {
                    var learningSet = await _context.LearningSets.Include(x => x.LearningItems).FirstOrDefaultAsync(u => u.Id == LearningSetId);
                    List<LearningItem> newItems = new List<LearningItem>();
                    if (learningSet != null)
                    {
                        var memorizedIds = await _context.LearningProgresses.Where(p => p.Owner.Id == UserId && p.LearningItem.LearningSet.Id == LearningSetId && p.MemorizedLevel == true).Select(x => x.LearningItem.Id).ToListAsync();

                        var available = learningSet.LearningItems.Where(l => !memorizedIds.Contains(l.Id)).ToList();

                        while (available.Count > 0)
                        {
                            Random r = new Random();
                            int index = r.Next(0, available.Count - 1);
                            newItems.Add(available[index]);
                            available.RemoveAt(index);
                            if (newItems.Count > user.ItemsPerLesson - 1)
                                break;
                        }
                    }

                    List<LearningItem> repetitionItems = new List<LearningItem>();
                    if (learningSet != null)
                    {
                        var memorizedIds = await _context.LearningProgresses.Where(p => p.Owner.Id == UserId && p.LearningItem.LearningSet.Id == LearningSetId && p.MemorizedLevel == false).Select(x => x.LearningItem.Id).ToListAsync();

                        var available = learningSet.LearningItems.Where(l => !memorizedIds.Contains(l.Id)).ToList();

                        while (available.Count > 0)
                        {
                            Random r = new Random();
                            int index = r.Next(0, available.Count - 1);
                            repetitionItems.Add(available[index]);
                            available.RemoveAt(index);
                            if (repetitionItems.Count > user.Repetitions - 1)
                                break;
                        }
                    }


                    List<LearningItem> items = new List<LearningItem>();
                    items.AddRange(newItems);
                    items.AddRange(repetitionItems);

                    return items;


                }
            }
            return null;
        }

        public async Task<ICollection<CourseDto>> GetOtherLearningSets(long UserId)
        {
            List<long> usersSetsIds = await _context.UserLearningSets.Where(l => l.UserId == UserId).Select(x => x.LearningSetId).ToListAsync();
            ICollection<LearningSet> usersSets = await _context.LearningSets.Include(x => x.LearningItems).Include(x => x.Author).Where(x => !usersSetsIds.Contains(x.Id)).ToListAsync();
            ICollection<CourseDto> collection = new List<CourseDto>();
            foreach (var c in usersSets)
            {
                CourseDto course = mapper.Map<CourseDto>(c);
                collection.Add(course);
            }

            return collection;
        }

        public async Task<ICollection<CourseDto>> GetUserCoursesCollection(long UserId)
        {
            ICollection<LearningSet> usersSets = await _context.LearningSets.Include(x => x.LearningItems).Include(x => x.Author).Where(x => x.Author.Id == UserId).ToListAsync();

            ICollection<CourseDto> collection = new List<CourseDto>();
            foreach (var c in usersSets)
            {
                CourseDto course = mapper.Map<CourseDto>(c);
                collection.Add(course);
            }

            return collection;
        }



// course repository
 
        public async Task<bool> CreateCourse(LearningSet course, long UserId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            await _context.LearningSets.AddAsync(new LearningSet() { Name = course.Name, Description = course.Description, Author = user, IsPrivate = false });
            await _context.SaveChangesAsync();

            return true;
        }
        
        public async Task<bool> RemoveAllItemsForCourse(long userId, long courseId)
        {
            try
            {
                var learningSet = await _context.LearningSets.Include(x => x.LearningItems).FirstOrDefaultAsync(s => s.Id == courseId);
                var items = learningSet.LearningItems.ToList();
                if (learningSet != null)
                    foreach (var c in items)
                    {
                        await RemoveItem(userId, c.Id);
                    }
                await _context.SaveChangesAsync();
                return true;
            }

            catch
            {
                return false;
            }
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
        
        public async Task<bool> ModifyCourseDetails(long UserId, long CourseId, string Title, string Description)
        {
            var learningSet = await _context.LearningSets.FirstOrDefaultAsync(s => s.Id == CourseId);
            if (learningSet != null)
            {
                learningSet.Name = Title;
                learningSet.Description = Description;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
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
            if (user != null && lSet != null && lSet.Author.Id == UserId)
            {
                var itm = new LearningItem()
                {
                    Item = Item.Item,
                    SentenceWithGaps = Item.SentenceWithGaps,
                    CorrectSentence = Item.CorrectSentence,
                    Description = Item.Description,
                    LearningSet = lSet
                };
                _context.LearningItems.Add(itm);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> UpdateItem(long UserId, LearningItem Item)
        {

            var dbItem = await _context.LearningItems.Include(x => x.LearningSet).Where(x => x.Id == Item.Id).FirstOrDefaultAsync();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            if (dbItem != null && user != null && UserId == dbItem.LearningSet.Author.Id)
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

       public async Task<Pagination> GetItemsForCourse(long UserId, long LearningSetId, int pageSize, int pageIndex, int length)
        {
            var learningSet = await _context.LearningSets.Include(x => x.LearningItems).FirstOrDefaultAsync(u => u.Id == LearningSetId);

            if (learningSet != null)
            {
                var p = new Pagination()
                {
                    items = GetItemsForPage(learningSet.LearningItems, pageSize, pageIndex),
                    length = learningSet.LearningItems.Count,
                    pageIndex = pageIndex,
                    pageSize = pageSize
                };
                return p; 
            }

            return new Pagination();
        }

           private ICollection<LearningItem> GetItemsForPage(ICollection<LearningItem> items, int pageSize, int pageIndex)
        {
            ICollection<LearningItem> res = items;
            if ((pageIndex * pageSize) <= items.Count)
                res = items.Skip(pageSize * pageIndex).Take(pageSize).ToList();
            return res;
        }


    }
} 