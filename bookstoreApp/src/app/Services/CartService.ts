import { BookInCart } from '../Models/bookInCart'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
    // подучение данных с сервера
    export class CartService {
    constructor(
        private http: HttpClient) { }

    private booksInCartUrl = 'api/cart'; //url to web api


    getBooksInCart(): Observable<BookInCart[]> {
        return this.http.get<BookInCart[]>(this.booksInCartUrl);
    }

    /**
     * Добавление книги в корзину.
     */
    addBookToCart(bookId: number): void {
        console.log(bookId);
    }
}
