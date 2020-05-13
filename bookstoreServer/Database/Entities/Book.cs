namespace bookstoreServer.Database.Entities
{
    /// <summary>
    ///  Книга в базе данных.
    /// </summary>
    public class Book
    {
        /// <summary>
        /// Идентификатор.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Имя.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Описание.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Цена.
        /// </summary>
        public double Price { get; set; }
    }
}