using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace bookstoreApp.Migrations
{
    public partial class CustomerIdToCartWithGuidType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CustomerId",
                table: "Cart",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Cart");
        }
    }
}
