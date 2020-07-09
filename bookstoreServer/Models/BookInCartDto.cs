using System;
/// <summary>
/// Транспортный класс для передачи информации о книге в корзине для передачи на клиент.
/// </summary>
public class BookInCartDto
{
    public Guid CustomerId { get; set; }

    /// <summary>
    /// Название книги.
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// Описание книги.
    /// </summary>
    public string Description { get; set; }

    /// <summary>
    /// Стоимость книги.
    /// </summary>
    public double Price { get; set; }

    /// <summary>
    /// Число экземпляров конкретной книги.
    /// </summary>
    public int BookCount { get; set; }
    /// <summary>
    /// Обложка.
    /// </summary>
    public string Image { get; set; }

    /// <summary>
    /// Автор.
    /// </summary>
    public string Author { get; set; }

    public int BookId { get; set; }
}

