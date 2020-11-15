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
using API.Dto;
using System.IO;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.AspNetCore.Cors;
using System.Text.Json;

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


        [HttpPut("{learningSetId}/ModifyCourseDetails")]
        public async Task<bool> ModifyCourseDetails(long userId, long learningSetId, [FromQuery] string title, [FromQuery] string description)
        {
            return await _repository.ModifyCourseDetails(userId, learningSetId, title, description);
        }

        [HttpGet("GetUserCourses")]
        public async Task<IEnumerable<CourseDto>> GetUserCourses(long userId)
        {
            var result = await _repository.GetUserCoursesCollection(userId);

            if (result != null)
                return result;
            else
                return null;
        }

        [HttpGet("GetAllCourses")]
        public async Task<IEnumerable<CourseDto>> GetAllCourses(long userId)
        {
            var result = await _repository.GetOtherLearningSets(userId);

            if (result != null)
                return result;
            else
                return null;
        }

        [HttpDelete("{courseId}/RemoveCourse")]
        public async Task<IActionResult> RemoveCourse(long userId, long courseId)
        {
            try
            {
                var result = await _repository.RemoveCourse(userId, courseId);

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

        [HttpPost("UpdateItem")]
        public async Task<IActionResult> UpdateItem(long userId, LearningItem Item)
        {
            var result = await _repository.UpdateItem(userId, Item);
            if (result)
                return Ok();
            else
                return NoContent();
        }

        [HttpPost("{learningSetId}/AddNewItem")]
        public async Task<IActionResult> AddNewItem(long userId, long learningSetId, LearningItem Item)
        {
            var result = await _repository.AddNewItem(userId, learningSetId, Item);
            if (result)
                return Ok();
            else
                return NoContent();
        }

        [HttpDelete("{LearningSetId}/RemoveItem")]
        public async Task<IActionResult> RemoveItem(long userId, long LearningSetId)
        {
            var result = await _repository.RemoveItem(userId, LearningSetId);
            if (result)
                return Ok();
            else
                return NoContent();
        }

        [HttpPost("CreateCourse")]
        public async Task<IActionResult> CreateCourse(long userId, LearningSet course)
        {
            var result = await _repository.CreateCourse(course, userId);
            if (result)
                return Ok();
            else
                return NoContent();
        }

        [HttpGet("{learningSetId}/GetItemsForCourse")]
        public async Task<Pagination> GetItemsForCourse(long userId, long learningSetId, [FromQuery] int pageSize, [FromQuery] int pageIndex, [FromQuery] int length)
        {
            var result = await _repository.GetItemsForCourse(userId, learningSetId, pageSize, pageIndex, length);

            if (result != null)
                return result;
            else
                return null;
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