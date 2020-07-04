using bookstoreServer.Database;
using bookstoreServer.Database.Entities;
using bookstoreServer.Interfaces;
using BookstoreSignal.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;


namespace bookstoreApp.Controllers
{
    [Route("api")]
    [ApiController]
    public class BookstoreController : Controller
    {
        private object _lockStoreTable = new object();

        private readonly BookstoreDbContext _context;
        private readonly IHubContext<BookstoreHub, IBookStoreHub> _hubContext;

        public BookstoreController(
            BookstoreDbContext context,
            IHubContext<BookstoreHub, IBookStoreHub> hubContext)
        {
            _hubContext = hubContext;
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
            lock (_lockStoreTable)
            {
                var puk = _context.Stores

                    .Include(s => s.Book)
                    .OrderBy(s => s.BookId)
                    .Select(s => ConvertToDto(s)).ToList();
                return puk;
            }
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

        [Route("cart/add")]
        [HttpPost]
        public bool AddBookToCart(AddBookDto addBookDto)
        {
            if (!_context.Books.Any(book => book.Id == addBookDto.BookId))
            {
                return false;
            }
            Guid newCustomerId = Guid.Parse(addBookDto.CustomerId);
            var cartItem = _context.Cart
                .SingleOrDefault(c => c.BookId == addBookDto.BookId
                 && c.CustomerId == newCustomerId);

            if (cartItem == null)
            {
                // Создание новой записи о книге в корзине если нет записи.
                cartItem = new Cart { BookId = addBookDto.BookId, CustomerId = newCustomerId, BookCount = 0 };
                _context.Add(cartItem);
            }
            if (cartItem.BookCount < 1)
            {
                cartItem.BookCount++;

                lock (_lockStoreTable)
                {
                    var storeItem = _context.Stores
                        .SingleOrDefault(s => s.BookId == addBookDto.BookId && s.Count > 0);
                    if (storeItem == null)
                    {
                        return false;
                    }
                    storeItem.Count--;
                    _context.SaveChanges();
                }

                _context.SaveChanges();

                _hubContext.Clients.All.SendUpdateCart(newCustomerId);
                _hubContext.Clients.All.SendUpdateBookstore();
            }
            return true;
        }

        [Route("cart/remove")]
        [HttpPost]
        public bool removeBookFromCart(AddBookDto addBookDto)
        {
            if (!_context.Books.Any(book => book.Id == addBookDto.BookId))
            {
                return false;
            }
            Guid newCustomerId = Guid.Parse(addBookDto.CustomerId);
            var cartItem = _context.Cart
                .SingleOrDefault(c => c.BookId == addBookDto.BookId
                 && c.CustomerId == newCustomerId);

            if (cartItem.BookCount == 1)
            {
                _context.Cart.Remove(cartItem);
                _context.SaveChanges();

                lock (_lockStoreTable)
                {
                    var storeItem = _context.Stores
                        .SingleOrDefault(s => s.BookId == addBookDto.BookId);
                    if (storeItem == null)
                    {
                        storeItem = new Store { BookId = addBookDto.BookId, Count = 1};
                        _context.Add(storeItem);
                    }
                    else 
                    {
                        storeItem.Count++;
                    }

                    _context.SaveChanges();

                }
                var puk = _context.Stores

                        .Include(s => s.Book)
                        .OrderBy(s => s.BookId)
                        .Select(s => ConvertToDto(s)).ToList();
                _hubContext.Clients.All.SendUpdateCart(newCustomerId);
                _hubContext.Clients.All.SendUpdateBookstore();
            }
            return true;
        }


        [Route("cart")]
        [HttpGet]
        public IEnumerable<CartDto> GetCart(Guid customerId)
        {
            return _context.Cart
                .Where(c => c.CustomerId == customerId) //Фильтр по кастомер айди
                .Include(c => c.Book)
                .OrderBy(s => s.BookId)
                .Select(c => ConvertToDto(c))
                .ToList();
        }

        static private CartDto ConvertToDto(Cart c)
        {
            var result = new CartDto();

            result.BookId = c.BookId;
            result.Name = c.Book.Name;
            result.CustomerId = c.CustomerId;
            result.Description = c.Book.Description;
            result.Price = c.Book.Price;
            result.BookCount = c.BookCount;

            return result;
        }
    }
}
