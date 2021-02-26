using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Anrtd.Infrastructure.Migrations
{
    public partial class AddToDoAuditFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "ToDo",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "ToDo",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Created",
                table: "ToDo");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "ToDo");
        }
    }
}
