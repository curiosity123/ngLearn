using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<LearningItem> LearningItems { get; set; }
        public DbSet<LearningSet> LearningSets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LearningSet>()
                .HasMany(s => s.LearningItems)
                .WithOne(i => i.LearningSetElement).OnDelete(DeleteBehavior.Cascade);
        }
    }
}