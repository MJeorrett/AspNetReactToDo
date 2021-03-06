using Microsoft.EntityFrameworkCore.Migrations;

namespace Anrtd.Infrastructure.Migrations
{
    public partial class AddTShirtSizeToToDo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TShirtSize",
                table: "ToDo",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TShirtSizeEntityId",
                table: "ToDo",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TShirtSizes",
                columns: table => new
                {
                    TShirtSizeId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TShirtSizes", x => x.TShirtSizeId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ToDo_TShirtSizeEntityId",
                table: "ToDo",
                column: "TShirtSizeEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDo_TShirtSizes_TShirtSizeEntityId",
                table: "ToDo",
                column: "TShirtSizeEntityId",
                principalTable: "TShirtSizes",
                principalColumn: "TShirtSizeId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDo_TShirtSizes_TShirtSizeEntityId",
                table: "ToDo");

            migrationBuilder.DropTable(
                name: "TShirtSizes");

            migrationBuilder.DropIndex(
                name: "IX_ToDo_TShirtSizeEntityId",
                table: "ToDo");

            migrationBuilder.DropColumn(
                name: "TShirtSize",
                table: "ToDo");

            migrationBuilder.DropColumn(
                name: "TShirtSizeEntityId",
                table: "ToDo");
        }
    }
}
