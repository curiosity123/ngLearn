using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ContentController : ControllerBase
    {

        [HttpGet]
        public IEnumerable<LearningItem> Get()
        {
            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            List<LearningItem> items = new List<LearningItem>();

            items.Add(getItems());

            return new List<LearningItem>()
            {
                getItems(),getItems() ,getItems() ,getItems(),getItems() ,getItems(),getItems() ,getItems(),getItems() ,getItems()
            };

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