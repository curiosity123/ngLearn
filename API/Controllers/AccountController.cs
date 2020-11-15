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
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _repository;

        public AccountController(IAccountRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("Export")]
        public async Task<FileStreamResult> Export(long userId)
        {

            //this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            string courses = await _repository.BackupAllCourses(userId);

            var ms = new MemoryStream();

            TextWriter tw = new StreamWriter(ms);
            tw.Write(courses);
            tw.Flush();
            ms.Position = 0;


            return new FileStreamResult(ms, "application/octet-stream")
            {
                FileDownloadName = "test.txt"
            };
        }

        [HttpPost("Import")]
        public async Task<IActionResult> AddCourseToBoard(long userId, [FromForm] IFormFile Backup)
        {
            string fileContent = null;
            using (var reader = new StreamReader(Backup.OpenReadStream()))
            {
                fileContent = reader.ReadToEnd();
            }

            try
            {
                List<LearningSet> courses = JsonSerializer.Deserialize<List<LearningSet>>(fileContent);
                bool result = await _repository.ImportAllCourses(userId, courses);
                if (result)
                    return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut("SaveUserSettings")]
        public async Task<bool> SaveUserSettings(long userId, [FromQuery] int repetitions, [FromQuery] int itemsPerLesson)
        {
            return await _repository.SaveUserSettings(userId, repetitions, itemsPerLesson);
        }

        [HttpPost("{LearningSetId}/ResetCourseProgress")]
        public async Task<IActionResult> ResetCourseProgress(long userId, long LearningSetId)
        {
            var result = await _repository.ResetProgress(userId, LearningSetId);
            if (result)
                return Ok();
            else
                return NoContent();
        }

        [HttpPost("UpdateCourseProgress")]
        public async Task<IActionResult> UpdateCourseProgress(LearningProgressDto[] progresses)
        {
            var result = await _repository.UpdateProgress(progresses);
            if (result)
                return Ok();
            else
                return NoContent();
        }

        [HttpDelete("{courseId}/RemoveCourseFromUsersCollection")]
        public async Task<IActionResult> RemoveCourseFromUsersCollection(long userId, long courseId)
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

        [HttpPost("{LearningSetId}/AddCourseToUsersCollection")]
        public async Task<IActionResult> AddCourseToUsersCollection(long userId, long LearningSetId)
        {
            var result = await _repository.AddLearningSetToUser(userId, LearningSetId);
            if (result)
                return Ok();
            else
                return NoContent();
        }

        [HttpGet("GetUsersCourses")]
        public async Task<IEnumerable<CourseWithProgressDto>> GetUsersCourses(long userId)
        {
            var result = await _repository.GetUserLearningSets(userId);

            if (result != null)
                return result;
            else
                return null;
        }

      

    }
}