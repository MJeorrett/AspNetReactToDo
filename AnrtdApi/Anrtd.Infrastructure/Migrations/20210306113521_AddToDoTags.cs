using Microsoft.EntityFrameworkCore.Migrations;

namespace Anrtd.Infrastructure.Migrations
{
    public partial class AddToDoTags : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ToDoTag",
                columns: table => new
                {
                    ToDoTagId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoTag", x => x.ToDoTagId);
                });

            migrationBuilder.CreateTable(
                name: "ToDoEntityToDoTagEntity",
                columns: table => new
                {
                    TagsId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ToDosId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoEntityToDoTagEntity", x => new { x.TagsId, x.ToDosId });
                    table.ForeignKey(
                        name: "FK_ToDoEntityToDoTagEntity_ToDo_ToDosId",
                        column: x => x.ToDosId,
                        principalTable: "ToDo",
                        principalColumn: "ToDoId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ToDoEntityToDoTagEntity_ToDoTag_TagsId",
                        column: x => x.TagsId,
                        principalTable: "ToDoTag",
                        principalColumn: "ToDoTagId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ToDoEntityToDoTagEntity_ToDosId",
                table: "ToDoEntityToDoTagEntity",
                column: "ToDosId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ToDoEntityToDoTagEntity");

            migrationBuilder.DropTable(
                name: "ToDoTag");
        }
    }
}
