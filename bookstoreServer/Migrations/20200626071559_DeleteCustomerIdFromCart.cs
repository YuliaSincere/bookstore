using Microsoft.EntityFrameworkCore.Migrations;

namespace bookstoreApp.Migrations
{
    public partial class DeleteCustomerIdFromCart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Cart");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_BookId",
                table: "Cart",
                column: "BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_Books_BookId",
                table: "Cart",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_Books_BookId",
                table: "Cart");

            migrationBuilder.DropIndex(
                name: "IX_Cart_BookId",
                table: "Cart");

            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "Cart",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
