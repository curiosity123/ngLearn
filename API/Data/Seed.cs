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

            var set = new LearningSet() { Name = "200 common PhrasalVerbs", LearningItems = items };
            _context.LearningSets.Add(set);
            _context.SaveChanges();
        }

        public void SeedUsers()
        {
            if (!_context.Users.Any())
            {
                var user = new User(){ UserName="root"};
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
