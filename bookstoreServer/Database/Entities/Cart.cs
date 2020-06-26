using System;
using System.ComponentModel.DataAnnotations;

namespace bookstoreServer.Database.Entities
{
    /// <summary>
    ///  Корзина в базе данных.
    /// </summary>
    public class Cart
    {
    
        /// <summary>
        /// Идентификатор.
        /// </summary>
        [Key]
        public int Id { get; set; }

        // /// <summary>
        // /// Идентификатор покупателя.
        // /// </summary>
        // public Guid CustomerId { get; set; }

        /// <summary>
        /// Идентификатор книги.
        /// </summary>
        public int BookId { get; set; }

        /// <summary>
        /// Количество экземпляров книги.
        /// </summary>
        public int BookCount { get; set; }
    

    public virtual Book Book { get; set; }
    }
}