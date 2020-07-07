import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SignalService } from 'src/app/Services/SignalService';
import { CartService } from 'src/app/Services/CartService';
import { CustomerService } from 'src/app/Services/CustomerService';
import { BookInOrder } from 'src/app/Models/bookInOrder';
import { Guid } from 'guid-typescript';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})

export class OrderComponent {
    // private orderSubscription: Subscription;
    public booksInOrder: BookInOrder[];

    // constructor(private cartService: CartService, private signalService: SignalService, private customerService: CustomerService) {
    //     this.cartService = cartService;
    //     this.signalService = signalService;
    //     this.customerService = customerService;

    //     this.orderSubscription = this.signalService.onUpdateOrder$.subscribe(args => {
    //         if (args.customerId.equals(this.customerService.customerId)) 
    //         {
                
    //             this.getBookInOrder(this.customerService.customerId);
    //         }
    //     })
    // }

    // ngOnDestroy(): void {
    //     this.orderSubscription.unsubscribe();
    // }

    // ngOnInit(): void {-
    //     this.getBookInOrder(this.customerService.customerId);
    // }

    // /**
    //  * Обновление заказа.
    //  */
    // private async getBookInOrder(customerId: Guid) {
    //     try {
    //         this.booksInOrder = await this.cartService.getBooksInOrder(customerId);

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

}
