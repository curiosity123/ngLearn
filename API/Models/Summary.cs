namespace API.Models
{
    public class Summary
    {
        public long UserId { get; set; }
        public long LearningSetId { get; set; }
        public double ProgressInPercentage { get; set; }
    }
}