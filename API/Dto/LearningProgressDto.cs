namespace API.Dto
{
    public class LearningProgressDto
    {
        public long OwnerId { get; set; }
        public bool MemorizedLevel { get; set; }
        public long LearningItemId { get; set; }
    }
}