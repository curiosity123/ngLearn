using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public interface IContentRepository : IGenericRepository
    {

        Task<ICollection<LearningSet>> GetUserLearningSets(long UserId);

        Task<ICollection<LearningItem>> GetItemsForCourse(long UserId, long LearningSetId);

        Task<ICollection<LearningSet>> GetOtherLearningSets(long UserId);

        Task<ICollection<LearningSet>> GetUserCoursesCollection(long UserId);

        Task<Summary> GetProgress(long UserId, long LearningSetId);

        Task<bool> UpdateProgress(LearningProgressDto[] progresses);

        Task<bool> CreateCourse(LearningSet course, long UserId);

        Task<bool> ResetProgress(long UserId, long LearningItemId);

        Task<bool> AddLearningSetToUser(long UserId, long LearningSetId);

        Task<bool> RemoveLearningSetToUser(long UserId, long LearningSetId);

        Task<bool> RemoveCourse(long UserId, long LearningSetId);

        Task<ICollection<LearningItem>> GetNewLessonItems(long UserId, long LearningSetId);

        Task<bool> UpdateItem(long UserId, LearningItem Item);

        Task<bool> RemoveItem(long UserId, long ItemId);


    }
}