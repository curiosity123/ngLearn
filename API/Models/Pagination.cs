using System.Collections.Generic;

namespace API.Models
{
    public class Pagination
    {
        public int pageIndex;
        public int pageSize;
        public int length;
        public ICollection<LearningItem> items;
    }

}