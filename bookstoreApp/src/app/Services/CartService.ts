import { BookInCart } from '../Models/bookInCart'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Guid } from "guid-typescript";
import { CustomerService } from './CustomerService';

@Injectable({
    providedIn: 'root',
})
// подучение данных с сервера
export class CartService {
    private booksInCartUrl = 'api/cart'; //url to web api
    private addBookToCartUrl = 'api/cart/add'; //url to web api

    constructor(private http: HttpClient, private customerService: CustomerService) {
        this.customerService = customerService;
     }

    async getBooksInCart(customerId: Guid): Promise<BookInCart[]> {
        const params = new HttpParams().set('customerId', customerId.toString());
        return this.http.get<BookInCart[]>(this.booksInCartUrl,{params: params}).toPromise();
    }

    /**
     * Добавление книги в корзину.
     */
    addBookToCart(bookId: number): Promise<boolean> {
        console.log(bookId);
        // TODO: customerId: customerId после получения.

        const data = { bookId: bookId, customerId: this.customerService.customerId.toString()};
        return this.http
            .post<boolean>(this.addBookToCartUrl, data)
            .toPromise();
    }
}
