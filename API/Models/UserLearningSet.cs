namespace API.Models
{
    public class UserLearningSet
    {
        public long UserId{get;set;}
        public User User {get;set;}
        public long LearningSetId{get;set;}
        public LearningSet LearningSet{get;set;}

    }
}