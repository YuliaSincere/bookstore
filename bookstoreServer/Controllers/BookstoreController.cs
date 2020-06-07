using bookstoreServer.Database;
using bookstoreServer.Database.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;


namespace bookstoreApp.Controllers
{
    [Route("api/store")]
    [ApiController]
    public class BookstoreController : Controller
    {
        private readonly BookstoreDbContext _context;

        public BookstoreController(BookstoreDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<BookTest> GetBookTest()
        {
            return _context.Stores
                .Include(s => s.Book)
                .Select(s => ConvertToDto(s)).ToList();
        }

        static private BookTest ConvertToDto(Store s)
        {
            var result = new BookTest();

            result.Description = s.Book.Description;
            result.Count = s.Count;

            return result;
        }
    }
}