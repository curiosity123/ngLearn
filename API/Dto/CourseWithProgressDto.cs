namespace API.Dto
{
    public class CourseWithProgressDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Rates { get; set; }
        public string Author { get; set; }
        public double Progress { get; set; }
    }
}