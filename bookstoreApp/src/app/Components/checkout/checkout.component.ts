import { Component, OnDestroy } from '@angular/core';
import { CustomerService } from 'src/app/Services/CustomerService';
import { SignalService } from 'src/app/Services/SignalService';
import { CartService } from 'src/app/Services/CartService';
import { Subscription } from 'rxjs';
import { BookInOrder } from 'src/app/Models/bookInOrder';
import { Guid } from 'guid-typescript';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnDestroy {
    public stringVar: string;
    private orderSubscription: Subscription;
    public booksInOrder: BookInOrder[];
    constructor(private cartService: CartService, private signalService: SignalService,private customerService: CustomerService) 
    {
        this.cartService = cartService;
        this.signalService = signalService;
        this.customerService = customerService;
        this.orderSubscription = this.signalService.onUpdateOrder$.subscribe(args => {
            console.log(this.customerService.customerId);
            if (args.customerId.equals(this.customerService.customerId)) 
            {
                this.getBookInOrder(this.customerService.customerId);

                this.stringVar = "/order?orderId=" + this.customerService.customerId.toString();
            }
        })
    }

    ngOnDestroy(): void {
        this.orderSubscription.unsubscribe();
    }

     /**
     * Обновление заказа.
     */
    private async getBookInOrder(customerId: Guid) {
        try {
            this.booksInOrder = await this.cartService.getBooksInOrder(customerId);

        } catch (error) {
            console.log(error);
        }
    }
}
