import { Component, OnInit } from '@angular/core'
import { BookInCart } from 'src/app/Models/bookInCart';
import { CartService } from 'src/app/Services/CartService';

import * as signalR from "@microsoft/signalr";

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
        this.getBookInCart();

        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5000/hubs")
            .build();

        connection.on("SendUpdateCart", (CustomerId: string) => {
            console.log('puk1');
            this.getBookInCart();
        });
        connection.start().catch(err => document.write(err));
    }

    private async getBookInCart() {
        try {
            this.booksInCart = await this.cartService.getBooksInCart();

        } catch (error) {
            console.log(error);
        }
    }
}