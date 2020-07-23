using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using API.Data;
using AutoMapper.Configuration;
using AutoMapper;

namespace api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/{userId}/[controller]")]
    public class ContentController : ControllerBase
    {
        private readonly IContentRepository _repository;

        public ContentController(IContentRepository repository)
        {
            _repository = repository;
        }



        [HttpGet("{learningSetId}/GetItems")]
        public async Task<IEnumerable<LearningItem>> GetItems(long userId, long learningSetId)
        {
            var result = await _repository.GetNewLessonItems(userId, learningSetId);

            if (result != null)
                return result;
            else
                return null;
        }



        [HttpGet("GetMyCourses")]

        public async Task<IEnumerable<LearningSet>> GetMyCourses(long userId)
        {
            var result = await _repository.GetUserLearningSets(userId);

            if (result != null)
                return result;
            else
                return null;
        }


        [HttpGet("{learningSetId}/GetProgress")]

        public async Task<Summary> GetProgress(long userId, long learningSetId)
        {
            var result = await _repository.GetProgress(userId, learningSetId);

            if (result != null)
                return result;
            else
                return null;
        }


        [HttpGet("GetAllCourses")]

        public async Task<IEnumerable<LearningSet>> GetAllCourses(long userId)
        {
            var result = await _repository.GetOtherLearningSets(userId);

            if (result != null)
                return result;
            else
                return null;
        }


        [HttpDelete("{courseId}/RemoveCourseFromMyBoard")]

        public async Task<IActionResult> RemoveCourseFromMyBoard(long userId, long courseId)
        {

            try
            {

                var result = await _repository.RemoveLearningSetToUser(userId, courseId);

                if (result)
                    return Ok();
                else
                    return NoContent();
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
        }


        [HttpPost("{LearningSetId}/AddCourseToBoard")]
        public async Task<IActionResult> AddCourseToBoard(long userId, long LearningSetId)
        {
            var result = await _repository.AddLearningSetToUser(userId, LearningSetId);
            if (result)
                return Ok();
            else
                return NoContent();
        }

        [HttpPost("UpdateProgress")]
        public async Task<IActionResult> UpdateProgress(LearningProgressDto[] progresses)
        {
            var result = await _repository.UpdateProgress(progresses);
            if (result)
                return Ok();
            else
                return NoContent();
        }

        [HttpPost("{LearningSetId}/ResetProgress")]
        public async Task<IActionResult> ResetProgress(long userId, long LearningSetId)
        {
            var result = await _repository.ResetProgress(userId, LearningSetId);
            if (result)
                return Ok();
            else
                return NoContent();
        }
        private LearningItem getItems()
        {

            string data = System.IO.File.ReadAllText("data.txt");
            List<string> rec = data.Split('\r').ToList();

            Random r = new Random();


            int index = r.Next(0, rec.Count() - 1);

            string[] record = rec[index].Split('\t');
            record.ToList().ForEach(x => x.Replace("\n", ""));
            return new LearningItem() { Id = index, Item = record[0], Description = record[1], SentenceWithGaps = record[2], CorrectSentence = record[3] };
        }
    }
}