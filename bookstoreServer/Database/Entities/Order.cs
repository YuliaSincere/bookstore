using System;
using System.ComponentModel.DataAnnotations;

namespace bookstoreServer.Database.Entities
{
    /// <summary>
    ///  Заказ в базе данных.
    /// </summary>
    public class Order
    {
        /// <summary>
        /// Идентификатор заказа.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Идентификатор покупателя.
        /// </summary>
        public Guid CustomerId { get; set; }

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