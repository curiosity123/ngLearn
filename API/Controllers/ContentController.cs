using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        //private readonly IMapper _mapper;
        // private readonly IConfiguration _config;
        private readonly IContentRepository _repository;

        public ContentController(IContentRepository repository)
        {
            //_mapper = mapper;
            //  _config = config;
            _repository = repository;
        }


        [HttpGet]
        public async Task<IEnumerable<LearningItem>> Get(long userId)
        {
            var result = await _repository.GetNewLessonItems(userId, 1);

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