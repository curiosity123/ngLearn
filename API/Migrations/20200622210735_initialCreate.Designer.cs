﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace api.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200622210735_initialCreate")]
    partial class initialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.4");

            modelBuilder.Entity("API.Models.LearningItem", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CorrectSentence")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Item")
                        .HasColumnType("TEXT");

                    b.Property<long?>("LearningSetId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SentenceWithGaps")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("LearningSetId");

                    b.ToTable("LearningItems");
                });

            modelBuilder.Entity("API.Models.LearningProgress", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<long?>("LearningItemId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("MemorizedLevel")
                        .HasColumnType("INTEGER");

                    b.Property<long?>("OwnerId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("LearningItemId");

                    b.HasIndex("OwnerId");

                    b.ToTable("LearningProgresses");
                });

            modelBuilder.Entity("API.Models.LearningSet", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<long?>("AuthorId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsPrivate")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int>("Rates")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.ToTable("LearningSets");
                });

            modelBuilder.Entity("API.Models.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("BLOB");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("API.Models.UserLearningSet", b =>
                {
                    b.Property<long>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<long>("LearningSetId")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "LearningSetId");

                    b.HasIndex("LearningSetId");

                    b.ToTable("UserLearningSets");
                });

            modelBuilder.Entity("API.Models.LearningItem", b =>
                {
                    b.HasOne("API.Models.LearningSet", "LearningSet")
                        .WithMany("LearningItems")
                        .HasForeignKey("LearningSetId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("API.Models.LearningProgress", b =>
                {
                    b.HasOne("API.Models.LearningItem", "LearningItem")
                        .WithMany("LearningProgresses")
                        .HasForeignKey("LearningItemId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("API.Models.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId");
                });

            modelBuilder.Entity("API.Models.LearningSet", b =>
                {
                    b.HasOne("API.Models.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId");
                });

            modelBuilder.Entity("API.Models.UserLearningSet", b =>
                {
                    b.HasOne("API.Models.LearningSet", "LearningSet")
                        .WithMany("UserLearningSets")
                        .HasForeignKey("LearningSetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Models.User", "User")
                        .WithMany("UserLearningSets")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
