import { Component, OnInit, OnDestroy } from '@angular/core'
import { BookInCart } from 'src/app/Models/bookInCart';
import { CartService } from 'src/app/Services/CartService';
import { SignalService } from 'src/app/Services/SignalService';
import { Subscription } from 'rxjs';

import { Guid } from "guid-typescript";
import { CustomerService } from 'src/app/Services/CustomerService';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})


export class CartComponent implements OnInit, OnDestroy {

    private onUpdateCartSubscription: Subscription;

    public booksInCart: BookInCart[];

    constructor(private cartService: CartService, private signalService: SignalService, private customerService: CustomerService) {
        this.cartService = cartService;
        this.signalService = signalService;
        this.customerService = customerService;

        this.onUpdateCartSubscription = this.signalService.onUpdateCart$.subscribe(customerId => {
            this.getBookInCart(customerId);
        })
    }

    ngOnDestroy(): void {
        this.onUpdateCartSubscription.unsubscribe();
    }

    ngOnInit(): void {-
        this.getBookInCart(this.customerService.customerId);
    }

    /**
     * Обновление корзины.
     */
    private async getBookInCart(customerId: Guid) {
        try {
            this.booksInCart = await this.cartService.getBooksInCart(customerId);

        } catch (error) {
            console.log(error);
        }
    }
}