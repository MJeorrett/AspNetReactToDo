using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Anrtd.Infrastructure.Migrations
{
    public partial class AddToDoLists : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ToDoListId",
                table: "ToDo",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ToDoList",
                columns: table => new
                {
                    ToDoListId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsSoftDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoList", x => x.ToDoListId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ToDo_ToDoListId",
                table: "ToDo",
                column: "ToDoListId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDo_ToDoList_ToDoListId",
                table: "ToDo",
                column: "ToDoListId",
                principalTable: "ToDoList",
                principalColumn: "ToDoListId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDo_ToDoList_ToDoListId",
                table: "ToDo");

            migrationBuilder.DropTable(
                name: "ToDoList");

            migrationBuilder.DropIndex(
                name: "IX_ToDo_ToDoListId",
                table: "ToDo");

            migrationBuilder.DropColumn(
                name: "ToDoListId",
                table: "ToDo");
        }
    }
}
