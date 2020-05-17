using System.Collections.Generic;

namespace API.Models
{
    public class LearningSet
    {

        // public LearningSet(string name, ICollection<LearningItem> items)
        // {
        //     Name = name;
        //     LearningItems = new List<LearningItem>();
        //     foreach (var item in items)
        //     if(item!=null)
        //         LearningItems.Add(item);
        // }

        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<LearningItem> LearningItems { get; set; }
    }
}