using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dto;
using API.Models;

namespace API.Data
{
    public interface IContentRepository
    {

     
        Task<bool> RemoveAllItemsForCourse(long userId, long courseId);
       
        Task<ICollection<CourseDto>> GetOtherLearningSets(long UserId);

        Task<ICollection<CourseDto>> GetUserCoursesCollection(long UserId);
        Task<bool> ModifyCourseDetails(long UserId, long CourseId, string Title, string Description);

      

        Task<bool> CreateCourse(LearningSet course, long UserId);



        Task<Pagination> GetItemsForCourse(long UserId, long LearningSetId, int pageSize, int pageIndex, int length);

        Task<bool> RemoveCourse(long UserId, long LearningSetId);

        Task<ICollection<LearningItem>> GetNewLessonItems(long UserId, long LearningSetId);

        Task<bool> UpdateItem(long UserId, LearningItem Item);

        Task<bool> RemoveItem(long UserId, long ItemId);

        Task<bool> AddNewItem(long UserId, long LearningSetId, LearningItem Item);

    }
}