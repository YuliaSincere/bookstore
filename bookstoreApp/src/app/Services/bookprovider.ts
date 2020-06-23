import { Book } from '../Models/book'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BookProvider {
    private booksArray: Book[] = [
        new Book(1, 'firstbook', 'This is a first book', 1, 89),
        new Book(2, 'secondbook', 'This is a second book', 2, 456),
        new Book(3, 'thirdbook', 'This is a third book', 3, 46),
        new Book(4, 'fourthbook', 'This is a fourth book', 360, 5678),
        new Book(5, 'fifthbook', 'This is a fifth book', 9000, 1234)];

    // подучение данных с сервера

    constructor(
        private http: HttpClient) { }

    private booksUrl = 'api/store'; //url to web api

    get books(): Book[] {
        return this.booksArray;
    }

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.booksUrl);
    }

}