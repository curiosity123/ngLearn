using System;
using System.Collections.Generic;
using System.Linq;
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

        public DbSet<LearningProgress> LearningProgresses { get; set; }

            public DbSet<UserLearningSet> UserLearningSets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LearningSet>()
                .HasMany(s => s.LearningItems)
                .WithOne(i => i.LearningSet).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<LearningItem>()
                            .HasMany(s => s.LearningProgresses)
                            .WithOne(i => i.LearningItem).OnDelete(DeleteBehavior.Cascade);




    modelBuilder.Entity<UserLearningSet>()
        .HasKey(bc => new { bc.UserId, bc.LearningSetId });  
    modelBuilder.Entity<UserLearningSet>()
        .HasOne(bc => bc.User)
        .WithMany(b => b.UserLearningSets)
        .HasForeignKey(bc => bc.UserId);  
    modelBuilder.Entity<UserLearningSet>()
        .HasOne(bc => bc.LearningSet)
        .WithMany(c => c.UserLearningSets)
        .HasForeignKey(bc => bc.LearningSetId);

        }



    }
}