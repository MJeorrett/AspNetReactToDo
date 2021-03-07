using Microsoft.EntityFrameworkCore.Migrations;

namespace Anrtd.Infrastructure.Migrations
{
    public partial class AddToDoLists : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ListId",
                table: "ToDo",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ToDoList",
                columns: table => new
                {
                    ToDoListId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsSoftDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoList", x => x.ToDoListId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ToDo_ListId",
                table: "ToDo",
                column: "ListId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDo_ToDoList_ListId",
                table: "ToDo",
                column: "ListId",
                principalTable: "ToDoList",
                principalColumn: "ToDoListId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDo_ToDoList_ListId",
                table: "ToDo");

            migrationBuilder.DropTable(
                name: "ToDoList");

            migrationBuilder.DropIndex(
                name: "IX_ToDo_ListId",
                table: "ToDo");

            migrationBuilder.DropColumn(
                name: "ListId",
                table: "ToDo");
        }
    }
}
