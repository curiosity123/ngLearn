using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class addedLearningSettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ItemsPerLesson",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Repetitions",
                table: "Users",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemsPerLesson",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Repetitions",
                table: "Users");
        }
    }
}
