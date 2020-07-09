
/// <summary>
/// Транспортный класс корзины
/// </summary>
public class CartDto 
{
    /// <summary>
    /// Книги в корзине.
    /// </summary>
    public BookInCartDto[] BooksInCart { get; set;}
    /// <summary>
    ///Доступность оформления заказа.
    /// </summary>
    /// <value></value>
    public bool AllowToCheckout { get; set; }
}

