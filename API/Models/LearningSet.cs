using System.Collections.Generic;

namespace API.Models
{
    public class LearningSet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<LearningItem> LearningItems { get; set; }
    }
}