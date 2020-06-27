using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public interface IContentRepository : IGenericRepository
    {

        Task<ICollection<LearningSet>> GetUserLearningSets(long UserId);

        Task<ICollection<LearningSet>> GetOtherLearningSets(long UserId);

        Task<Summary> GetSummaryForLearningSets(long LearningSetId);

        Task<bool> AddLearningSetToUser(long UserId, long LearningSetId);

        Task<bool> RemoveLearningSetToUser(long UserId, long LearningSetId);

        Task<ICollection<LearningItem>> GetNewLessonItems(long UserId, long LearningSetId);

    }
}