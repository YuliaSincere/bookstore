import { Component, OnInit, OnDestroy } from '@angular/core'
import { BookInCart } from 'src/app/Models/bookInCart';
import { CartService } from 'src/app/Services/CartService';
import { SignalService } from 'src/app/Services/SignalService';
import { Subscription } from 'rxjs';

import { Guid } from "guid-typescript";
import { CustomerService } from 'src/app/Services/CustomerService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})


export class CartComponent implements OnInit, OnDestroy {

    private onUpdateCartSubscription: Subscription;
    public allowToCheckout: boolean;
    public booksInCart: BookInCart[];

    constructor(private router: Router, private cartService: CartService, private signalService: SignalService, private customerService: CustomerService) {
        this.cartService = cartService;
        this.signalService = signalService;
        this.customerService = customerService;

        this.onUpdateCartSubscription = this.signalService.onUpdateCart$.subscribe(args => {
            if (args.customerId.equals(this.customerService.customerId)) 
            {
                this.allowToCheckout = args.allowToCheckout;
                this.getBookInCart(this.customerService.customerId);
            }
        })
    }

    ngOnDestroy(): void {
        this.onUpdateCartSubscription.unsubscribe();
    }

    ngOnInit(): void {-
        this.getBookInCart(this.customerService.customerId);
    }

    async onClick() {
        await this.cartService.checkoutBooksFromCart();
        this.router.navigateByUrl('/checkout');
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