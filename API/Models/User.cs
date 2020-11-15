using System.Collections.Generic;

namespace API.Models
{
    public class User
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public ICollection<UserLearningSet> UserLearningSets { get; set; }
        public int ItemsPerLesson { get; set; } = 10;
        public int Repetitions { get; set; } = 2;

    }
}