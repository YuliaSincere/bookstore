using System.Collections.Generic;
using System.Linq;

namespace bookstoreServer.Database.Entities
{
    public static class DatabaseSeeder
    {
        public static void Seed(BookstoreDbContext context)
        {
            if (context.Books.Any())
            {
                return;
            }

             var books = new List<Book>
                {
                    new Book { Name = "FirstBook", Description = "This is a book", Price = 200 },
                    new Book { Name = "SecondBook", Description = "This is a book", Price = 270 },
                    new Book { Name = "ThirdBook", Description = "This is a book", Price = 290 },
                    new Book { Name = "FourthBook", Description = "This is a book", Price = 500 },
                };

            context.Books.AddRange(books);

            var store1 = new Store { Book = books[0], Count = 2 };
            context.Stores.AddRange(store1);
            var store2 = new Store { Book = books[1], Count = 7 };
            context.Stores.AddRange(store2);
            var store3= new Store { Book = books[2], Count = 9 };
            context.Stores.AddRange(store3);
            var store4 = new Store { Book = books[3], Count = 3 };
            context.Stores.AddRange(store4);

            context.SaveChanges();
        }
    }
}