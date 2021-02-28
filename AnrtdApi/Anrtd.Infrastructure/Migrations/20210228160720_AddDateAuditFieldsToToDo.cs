using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Anrtd.Infrastructure.Migrations
{
    public partial class AddDateAuditFieldsToToDo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "ToDo",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDate",
                table: "ToDo",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "ToDo");

            migrationBuilder.DropColumn(
                name: "LastModifiedDate",
                table: "ToDo");
        }
    }
}
