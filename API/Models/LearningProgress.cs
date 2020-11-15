using System.Collections.Generic;

namespace API.Models
{
    public class LearningProgress
    {
        public long Id { get; set; }
        public User Owner { get; set; }
        public bool MemorizedLevel { get; set; }
        public LearningItem LearningItem { get; set; }

    }
};