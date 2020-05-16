namespace API.Models
{
    public class LearningItem
    {
        public long Id{get;set;}
        public string Item{get;set;}
        public string Description{get;set;}
        public string SentenceWithGaps {get;set;}
        public string CorrectSentence{get;set;}
    }


    
}