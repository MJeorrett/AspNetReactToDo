using Microsoft.EntityFrameworkCore.Migrations;

namespace Anrtd.Infrastructure.Migrations
{
    public partial class AddToDoStatusFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ToDo_Status",
                table: "ToDo",
                column: "Status");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDo_ToDoStatuses_Status",
                table: "ToDo",
                column: "Status",
                principalTable: "ToDoStatuses",
                principalColumn: "ToDoStatusId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDo_ToDoStatuses_Status",
                table: "ToDo");

            migrationBuilder.DropIndex(
                name: "IX_ToDo_Status",
                table: "ToDo");
        }
    }
}
