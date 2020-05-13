namespace bookstoreServer.Database.Entities
{
    /// <summary>
    /// Склад книг.
    /// </summary>
    public class Store
    {
        /// <summary>
        /// Идентификатор книги.
        /// </summary>
        public int BookId { get; set; }

        /// <summary>
        /// Количество книг с конкретном идентификатором.
        /// </summary>
        public int Count { get; set; }

        public virtual Book Book  { get; set; }
    }
}