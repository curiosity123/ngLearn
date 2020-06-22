using System.Collections.Generic;

namespace API.Models
{
    public class LearningItem
    {
        public long Id{get;set;}
        public string Item{get;set;}
        public string Description{get;set;}
        public string SentenceWithGaps {get;set;}
        public string CorrectSentence{get;set;}
        public LearningSet LearningSet{get;set;}
        public ICollection<LearningProgress> LearningProgresses { get; set; }

    }


    
}