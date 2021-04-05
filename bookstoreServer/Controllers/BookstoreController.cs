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
using System.Threading.Tasks;

namespace bookstoreApp.Controllers
{
    [Route("api")]
    [ApiController]
    public class BookstoreController : Controller
    {
        private const int checkoutSum = 2000;
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

        [Route("order")]
        [HttpGet]
        public IEnumerable<OrderDto> GetOrderDto(Guid customerId) 
        {
            lock (_lockStoreTable)
            {
                return _context.Orders
                .Where(o => o.CustomerId == customerId) //Фильтр по кастомер айди
                .Include(o => o.Book)
                .OrderBy(s => s.BookId)
                .Select(o => ConvertToDto(o))
                .ToList();
            }
        }

        static private OrderDto ConvertToDto(Order o)
        {
            var result = new OrderDto();

            result.Name = o.Book.Name;
            result.Price = o.Book.Price;
            result.BookCount = o.BookCount;
            result.BookId = o.BookId;
            result.CustomerId = o.CustomerId;

            return result;
        }

        static private BookDto ConvertToDto(Store s)
        {
            var result = new BookDto();

            result.Id = s.Book.Id;
            result.Name = s.Book.Name;
            result.Price = s.Book.Price;
            result.Description = s.Book.Description;
            result.Count = s.Count;
            result.Author = s.Book.Author;
            result.Image = s.Book.Image;

            return result;
        }

        [Route("cart/add")]
        [HttpPost]
        public JsonResult AddBookToCart(AddBookDto addBookDto)
        {
            if (!_context.Books.Any(book => book.Id == addBookDto.BookId))
            {
                // С клиента пришел айди несуществующей книги.
                return Json("Не существует такой книги");
            }

            // Получение записи об определенной книге в корзине для определенного покупателя.
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
            else {
                // Запись о такой книге в корзине есть.
                return Json("Нельзя добавить в корзину более одного экземпляра конкретной книги");
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
                        return Json("Данной книги нет в наличии");
                    }
                    storeItem.Count--;
                    _context.SaveChanges();
                }
                _context.SaveChanges();
                UpdateCart(newCustomerId);
            }
            return Json(string.Empty);
        }

        [Route("cart/remove")]
        [HttpPost]
        public bool RemoveBookFromCart(AddBookDto addBookDto)
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
                        storeItem = new Store { BookId = addBookDto.BookId, Count = 1 };
                        _context.Add(storeItem);
                    }
                    else
                    {
                        storeItem.Count++;
                    }
                    _context.SaveChanges();
                }
                UpdateCart(newCustomerId);
            }
            return true;
        }

        [Route("checkout")]
        [HttpPost]
        public bool CheckoutOrder(string customerId)
        {
            Guid orderCustomerId = Guid.Parse(customerId);
            var orderCartItems = _context.Cart
                .Where(cartItem => cartItem.CustomerId == orderCustomerId)
                .ToArray();
            foreach (var cartItem in orderCartItems)
            {
                var order = new Order
                {
                    CustomerId = orderCustomerId,
                    BookId = cartItem.BookId,
                    BookCount = cartItem.BookCount
                };
                _context.Add(order);
            }
            _context.RemoveRange(orderCartItems);
            _context.SaveChanges();

            // Создание фоновой задачи, которая имитирует задержку в оформлении заказа.
            Task.Factory.StartNew( async () => 
                {
                    await Task.Delay(TimeSpan.FromSeconds(5));
                    await _hubContext.Clients.All.SendUpdateOrder(orderCustomerId);
                });
            return true;
        }


        [Route("cart")]
        [HttpGet]
        public CartDto GetCart(Guid customerId)
        {
            var result = new CartDto();
            result.BooksInCart = _context.Cart
                .Where(c => c.CustomerId == customerId) //Фильтр по кастомер айди
                .Include(c => c.Book)
                .OrderBy(s => s.BookId)
                .Select(c => ConvertToDto(c))
                .ToArray();
            var sum = result.BooksInCart
                .Sum(c => c.Price);
            result.AllowToCheckout = (sum >= checkoutSum);
            return result;

        }

        static private BookInCartDto ConvertToDto(Cart c)
        {
            var result = new BookInCartDto();

            result.BookId = c.BookId;
            result.Name = c.Book.Name;
            result.CustomerId = c.CustomerId;
            result.Description = c.Book.Description;
            result.Price = c.Book.Price;
            result.BookCount = c.BookCount;
            result.Author = c.Book.Author;
            result.Image = c.Book.Image;

            return result;
        }

        private void UpdateCart(Guid customerId)
        {
            var sum = _context.Cart
                .Where(c => c.CustomerId == customerId)
                .Select(c => c.Book.Price)
                .Sum();

            bool allowToCheckout = (sum >= checkoutSum);
            _hubContext.Clients.All.SendUpdateCart(customerId, allowToCheckout);
            _hubContext.Clients.All.SendUpdateBookstore();
        }
    }
}
