using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using API.Models;
using Newtonsoft.Json;

namespace API.Data
{
    public class Seed
    {

        private readonly DataContext _context;

        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedLearningSet()
        {

            if (_context.LearningSets.Any())
                return;

            string data = System.IO.File.ReadAllText("data.txt");
            List<string> rec = data.Split('\r').ToList();
            List<LearningItem> items = new List<LearningItem>();

            for (int i = 0; i < rec.Count - 1; i++)
            {
                string[] record = rec[i].Split('\t');
                record.ToList().ForEach(x => x.Replace("\n", ""));
                items.Add(new LearningItem() { Item = record[0], Description = record[1], SentenceWithGaps = record[2], CorrectSentence = record[3] });
            }

            var set = new LearningSet() { Name = "200 common PhrasalVerbs", Description = "Most useful 200 phrasal verbs. This course will help you to improve your english really fast, it's free so add it to your learning board and practice every day!", LearningItems = items };
            _context.LearningSets.Add(set);
            _context.SaveChanges();

            items = new List<LearningItem>();
            for (int i = 0; i < rec.Count - 1; i++)
            {
                string[] record = rec[i].Split('\t');
                record.ToList().ForEach(x => x.Replace("\n", ""));
                items.Add(new LearningItem() { Item = record[0], Description = record[1], SentenceWithGaps = record[2], CorrectSentence = record[3] });
            }

            set = new LearningSet() { Name = "150 common PhrasalVerbs", Description = "Some usefull phrasals", LearningItems = items };
            _context.LearningSets.Add(set);
            _context.SaveChanges();

            items = new List<LearningItem>();
            for (int i = 0; i < rec.Count - 1; i++)
            {
                string[] record = rec[i].Split('\t');
                record.ToList().ForEach(x => x.Replace("\n", ""));
                items.Add(new LearningItem() { Item = record[0], Description = record[1], SentenceWithGaps = record[2], CorrectSentence = record[3] });
            }
            set = new LearningSet() { Name = "150 fake  PhrasalVerbs", Description = "For tests only", LearningItems = items };
            _context.LearningSets.Add(set);
            _context.SaveChanges();
        }

        public void SeedUsers()
        {
            if (!_context.Users.Any())
            {
                var user = new User() { UserName = "root" };
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHashSalt("pass", out passwordHash, out passwordSalt);
                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.UserName = user.UserName.ToLower();
                    _context.Users.Add(user);

                }
                _context.SaveChanges();
            }
        }



        private void CreatePasswordHashSalt(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }

}
