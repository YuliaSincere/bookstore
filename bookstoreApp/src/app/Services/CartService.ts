import { BookInCart } from '../Models/bookInCart'
import { CartDto } from "../Models/CartDto";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Guid } from "guid-typescript";
import { CustomerService } from './CustomerService';
import { BookInOrder } from '../Models/bookInOrder';

@Injectable({
    providedIn: 'root',
})
// подучение данных с сервера
export class CartService {
    private booksInCartUrl = 'api/cart'; //url to web api
    private booksInOrderUrl = 'api/order'; //url to web api
    private addBookToCartUrl = 'api/cart/add'; //url to web api
    private removeBookFromCartUrl = 'api/cart/remove'; //url to web api
    private checkoutBooksFromCartUrl = 'api/checkout'; //url to web api

    constructor(private http: HttpClient, private customerService: CustomerService) {
        this.customerService = customerService;
    }

    async getBooksInCart(customerId: Guid): Promise<CartDto> {
        const params = new HttpParams().set('customerId', customerId.toString());
        const cartDto = await this.http.get<CartDto>(this.booksInCartUrl, { params: params }).toPromise();
       
        for (let i=0; i<cartDto.booksInCart.length; i++) {
            //TODO: "/assets/CoverImages/" придумать с этим ченить
            cartDto.booksInCart[i].image = "/assets/CoverImages/" + cartDto.booksInCart[i].image; 
        }
        return Promise.resolve(cartDto);
    }

    async getBooksInOrder(customerId: Guid): Promise<BookInOrder[]> {
        const params = new HttpParams().set('customerId', customerId.toString());
        return this.http.get<BookInOrder[]>(this.booksInOrderUrl, { params: params }).toPromise();
    }

    /**
     * Добавление книги в корзину.
     */
    addBookToCart(bookId: number): Promise<boolean> {
        const data = { bookId: bookId, customerId: this.customerService.customerId.toString() };
        return this.http
            .post<boolean>(this.addBookToCartUrl, data)
            .toPromise();
    }

    /**
     * Отмена добавления книги в корзину.
     */
    removeBookFromCart(bookId: number): Promise<boolean> {
        const data = { bookId: bookId, customerId: this.customerService.customerId.toString() };
        return this.http
            .post<boolean>(this.removeBookFromCartUrl, data)
            .toPromise();
    }

    /**
     * Чекаут по корзине.
     */
    checkoutBooksFromCart(): Promise<boolean> {
        const data = { customerId: this.customerService.customerId.toString() };

        return this.http
            .post<boolean>(
                this.checkoutBooksFromCartUrl,
                null,
                {
                    params: {
                        customerId: this.customerService.customerId.toString()
                    }
                })
            .toPromise();

        // return this.http
        //     .post<boolean>(
        //         this.checkoutBooksFromCartUrl,
        //         `\"${this.customerService.customerId.toString()}\"`,
        //         {
        //             headers: new HttpHeaders({
        //                 'Content-Type': 'application/json'
        //             })
        //         })
        //     .toPromise();
    }
}
