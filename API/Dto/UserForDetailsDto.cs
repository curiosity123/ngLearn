namespace API.Dto
{
    public class UserForDetailsDto
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public int ItemsPerLesson { get; set; } 
        public int Repetitions { get; set; }
    }
}