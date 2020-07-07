using System;
using System.Threading.Tasks;

namespace bookstoreServer.Interfaces
{
    /// <summary>
    /// Интерфейс для взаимодействия с хабом SignalR для передачи сообщений на клиент.
    /// </summary>
    public interface IBookStoreHub
    {
        /// <summary>
        /// Отправка сообщения клиентам о необходимости обновить корзину для определенного покупателя.
        /// </summary>
        /// <param name="CustomerId">Идентификатор покупателя.</param>
        /// <returns></returns>
         Task SendUpdateCart(Guid CustomerId, bool allowToCheckout);
         Task SendUpdateBookstore();
         Task SendUpdateOrder(Guid customerId);
    }
}