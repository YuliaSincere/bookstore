import { Book } from '../Models/book'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BookProvider {
    // подучение данных с сервера

    constructor(
        private http: HttpClient) { }

    private booksUrl = 'api/store'; //url to web api

    getBooks(): Promise<Book[]> {
        return this.http.get<Book[]>(this.booksUrl).toPromise();
    }

}