using System.Collections.Generic;

namespace API.Models
{
    public class LearningSet
    {

        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Rates { get; set; }
        public bool IsPrivate { get; set; }
        public User Author { get; set; }

        public ICollection<UserLearningSet> UserLearningSets { get; set; }
        public ICollection<LearningItem> LearningItems { get; set; }
    }
}