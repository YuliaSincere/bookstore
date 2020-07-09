import { Book } from '../Models/book'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BookProvider {
    // подучение данных с сервера

    constructor(
        private http: HttpClient) { }

    private booksUrl = 'api/store'; //url to web api

    async getBooks(): Promise<Book[]> {
        const books = await this.http.get<Book[]>(this.booksUrl).toPromise();
        for (let i=0; i<books.length; i++) {
            books[i].image = "/assets/CoverImages/" + books[i].image; 
            // books[i].image = "/1.jpg";
        }
        return Promise.resolve(books);
    }

}