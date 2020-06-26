using bookstoreServer.Database;
using bookstoreServer.Database.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;


namespace bookstoreApp.Controllers
{
    [Route("api")]
    [ApiController]
    public class BookstoreController : Controller
    {
        private readonly BookstoreDbContext _context;

        public BookstoreController(BookstoreDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// возвращает список книг, оставшихся на складе
        /// </summary>
        /// <returns></returns>
        [Route("store")]
        [HttpGet]
        public IEnumerable<BookDto> GetBookDto()
        {
            return _context.Stores
                .Include(s => s.Book)
                .Select(s => ConvertToDto(s)).ToList();
        }

        static private BookDto ConvertToDto(Store s)
        {
            var result = new BookDto();

            result.Id = s.Book.Id;
            result.Name = s.Book.Name;
            result.Price = s.Book.Price;
            result.Description = s.Book.Description;
            result.Count = s.Count;

            return result;
        }

        [Route("cart")]
        [HttpGet]
        public IEnumerable<CartDto> GetCart()
        {
            return _context.Cart
                .Include(c => c.Book)
                .Select(c => ConvertToDto(c)).ToList();
        }

        static private CartDto ConvertToDto(Cart c)
        {
            var result = new CartDto();

            result.Name = c.Book.Name;
            result.CustomerId = c.CustomerId;
            result.Description = c.Book.Description;
            result.Price = c.Book.Price;

            result.BookCount = c.BookCount;

            return result;
        }
    }
}
