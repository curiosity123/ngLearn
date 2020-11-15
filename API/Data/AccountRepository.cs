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
    public class AccountRepository : IAccountRepository
    {
        private readonly DataContext _context;
        private readonly IMapper mapper;
        private readonly IContentRepository _contentRepository;

        public AccountRepository(DataContext context, IContentRepository contentRepository, IMapper mapper)
        {
            this.mapper = mapper;
            _context = context;
            _contentRepository = contentRepository;
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

        public async Task<string> BackupAllCourses(long userId)
        {
            var courses = new List<LearningSet>();
            var usersLearningSets = await GetUserLearningSets(userId);

            foreach (var c in usersLearningSets)
            {
                var itms = await _contentRepository.GetItemsForCourse(userId, c.Id, 10000, 0, 10000);
                var set = new LearningSet() { Name = c.Name, Description = c.Description };
                set.LearningItems = new List<LearningItem>();
                foreach (var i in itms.items)
                    set.LearningItems.Add(new LearningItem()
                    {
                        CorrectSentence = i.CorrectSentence,
                        SentenceWithGaps = i.SentenceWithGaps,
                        Item = i.Item,
                        Description = i.Description
                    });

                courses.Add(set);
            }

            return JsonSerializer.Serialize(courses);
        }

        public async Task<bool> ImportAllCourses(long userId, List<LearningSet> courses)
        {

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            foreach (var c in courses)
            {
                var set = new LearningSet() { Name = c.Name + "test", Description = c.Description, LearningItems = c.LearningItems.ToList(), Author = user };
                _context.LearningSets.Add(set);
                _context.SaveChanges();
            }

            return true;
        }

        public async Task<bool> SaveUserSettings(long UserId, int Repetitions, int ItemsPerLesson)
        {
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Id == UserId);
            if (user != null)
            {
                user.Repetitions = Repetitions;
                user.ItemsPerLesson = ItemsPerLesson;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }



        public async Task<ICollection<CourseWithProgressDto>> GetUserLearningSets(long UserId)
        {
            List<long> usersSetsIds = await _context.UserLearningSets.Where(l => l.UserId == UserId).Select(x => x.LearningSetId).ToListAsync();
            ICollection<LearningSet> usersSets = await _context.LearningSets.Include(x => x.LearningItems).Include(x => x.Author).Where(x => usersSetsIds.Contains(x.Id)).ToListAsync();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == UserId);

            ICollection<CourseWithProgressDto> collection = new List<CourseWithProgressDto>();
            foreach (var c in usersSets)
            {
                CourseWithProgressDto course = mapper.Map<CourseWithProgressDto>(c);


                if (user != null && c != null)
                {
                    var prog = await _context.LearningProgresses.Where(p => p.Owner == user && p.LearningItem.LearningSet.Id == c.Id && p.MemorizedLevel).ToListAsync();
                    double percentage = (double)(((double)prog.Count / (double)c.LearningItems.Count)) * 100;
                    if (double.IsNaN(percentage))
                        percentage = 0;


                    course.Progress = percentage;
                    collection.Add(course);

                }


            }
            return collection;
        }

    }
}