using bookstoreServer.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace bookstoreServer.Database
{
    public class BookstoreDbContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Store> Stores { get; set; }
        public BookstoreDbContext(DbContextOptions<BookstoreDbContext> options) 
            : base(options)
        {
            
        }
    }
}