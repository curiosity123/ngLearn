using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class initialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserName = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LearningSets",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Rates = table.Column<int>(nullable: false),
                    IsPrivate = table.Column<bool>(nullable: false),
                    AuthorId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LearningSets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LearningSets_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LearningItems",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Item = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    SentenceWithGaps = table.Column<string>(nullable: true),
                    CorrectSentence = table.Column<string>(nullable: true),
                    LearningSetId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LearningItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LearningItems_LearningSets_LearningSetId",
                        column: x => x.LearningSetId,
                        principalTable: "LearningSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLearningSets",
                columns: table => new
                {
                    UserId = table.Column<long>(nullable: false),
                    LearningSetId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLearningSets", x => new { x.UserId, x.LearningSetId });
                    table.ForeignKey(
                        name: "FK_UserLearningSets_LearningSets_LearningSetId",
                        column: x => x.LearningSetId,
                        principalTable: "LearningSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserLearningSets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LearningProgresses",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OwnerId = table.Column<long>(nullable: true),
                    MemorizedLevel = table.Column<bool>(nullable: false),
                    LearningItemId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LearningProgresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LearningProgresses_LearningItems_LearningItemId",
                        column: x => x.LearningItemId,
                        principalTable: "LearningItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LearningProgresses_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LearningItems_LearningSetId",
                table: "LearningItems",
                column: "LearningSetId");

            migrationBuilder.CreateIndex(
                name: "IX_LearningProgresses_LearningItemId",
                table: "LearningProgresses",
                column: "LearningItemId");

            migrationBuilder.CreateIndex(
                name: "IX_LearningProgresses_OwnerId",
                table: "LearningProgresses",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_LearningSets_AuthorId",
                table: "LearningSets",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLearningSets_LearningSetId",
                table: "UserLearningSets",
                column: "LearningSetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LearningProgresses");

            migrationBuilder.DropTable(
                name: "UserLearningSets");

            migrationBuilder.DropTable(
                name: "LearningItems");

            migrationBuilder.DropTable(
                name: "LearningSets");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
