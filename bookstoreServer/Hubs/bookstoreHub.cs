using bookstoreServer.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace BookstoreSignal.Hubs 
{
    public class BookstoreHub : Hub<IBookStoreHub>
    {
        public async Task SendUpdateCart(Guid CustomerId, bool allowToCheckout)
        {
            await Clients.All.SendUpdateCart(CustomerId, allowToCheckout);
        }
        public async Task SendUpdateBookstore()
        {
            await Clients.All.SendUpdateBookstore();
        }
    }
}