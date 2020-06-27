import { Component, OnInit } from '@angular/core'
import { BookInCart } from 'src/app/Models/bookInCart';
import { CartService } from 'src/app/Services/CartService';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
    public booksInCart: BookInCart[];

    constructor(private cartService: CartService) {
        this.cartService = cartService;
    }

    ngOnInit(): void {
        this.cartService.getBooksInCart()
            .subscribe((booksInCart: BookInCart[]) => this.booksInCart = booksInCart);
    }
}