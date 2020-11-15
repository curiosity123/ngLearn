using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dto;
using API.Models;

namespace API.Data
{
    public interface IAccountRepository
    {

        Task<string> BackupAllCourses(long userId);

        Task<bool> ImportAllCourses(long userId, List<LearningSet> courses);

        Task<bool> UpdateProgress(LearningProgressDto[] progresses);

        Task<bool> ResetProgress(long UserId, long LearningItemId);

        Task<bool> AddLearningSetToUser(long UserId, long LearningSetId);

        Task<bool> RemoveLearningSetToUser(long UserId, long LearningSetId);

        Task<bool> SaveUserSettings(long UserId, int Repetitions, int ItemsPerLesson);

        Task<ICollection<CourseWithProgressDto>> GetUserLearningSets(long UserId);


    }
}