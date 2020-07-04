using System;
/// <summary>
/// Транспортный класс для передачи информации о книге в корзине для передачи на клиент.
/// </summary>
public class CartDto
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

    public int BookId { get; set; }
}

