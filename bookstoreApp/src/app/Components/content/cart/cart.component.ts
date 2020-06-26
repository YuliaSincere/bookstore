import { Component, OnInit } from '@angular/core'
import { BookInCart } from 'src/app/Models/bookInCart';
import { BookInCartProvider } from 'src/app/Services/cartprovider';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
    public booksInCart: BookInCart[];

    constructor(private bookInCartProvider: BookInCartProvider) {
        this.bookInCartProvider = bookInCartProvider;
    }

    ngOnInit(): void {
        this.bookInCartProvider.getBooksInCart()
            .subscribe((booksInCart: BookInCart[]) => this.booksInCart = booksInCart);
    }
}