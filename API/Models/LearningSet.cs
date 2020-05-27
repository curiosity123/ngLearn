using System.Collections.Generic;

namespace API.Models
{
    public class LearningSet
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsPrivate { get; set; }
        public int UserId { get; set; }
        public ICollection<LearningItem> LearningItems { get; set; }
    }
}