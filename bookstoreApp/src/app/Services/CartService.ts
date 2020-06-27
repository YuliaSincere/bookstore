import { BookInCart } from '../Models/bookInCart'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBookDto } from '../Models/AddBookDto';

@Injectable({
    providedIn: 'root',
})
// подучение данных с сервера
export class CartService {
    private booksInCartUrl = 'api/cart'; //url to web api
    private addBookToCartUrl = 'api/cart/add'; //url to web api

    constructor(private http: HttpClient) { }

    async getBooksInCart(): Promise<BookInCart[]> {
        return this.http.get<BookInCart[]>(this.booksInCartUrl).toPromise();
    }

    /**
     * Добавление книги в корзину.
     */
    addBookToCart(bookId: number): Promise<boolean> {
        console.log(bookId);
        // TODO: customerId: customerId после получения.

        const data = { bookId: bookId, customerId: '' };
        return this.http
            .post<boolean>(this.addBookToCartUrl, data)
            .toPromise();
    }
}
