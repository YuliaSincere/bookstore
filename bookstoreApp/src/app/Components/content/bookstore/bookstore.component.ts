import { Component } from '@angular/core'
import { BookProvider } from '../../../Services/bookprovider';
import { Book } from '../../../Models/book';

@Component({
    selector: 'app-bookstore',
    templateUrl: './bookstore.component.html',
    styleUrls: ['./bookstore.component.scss']
})

export class BookstoreComponent {
    private bookProvider: BookProvider; //this

    constructor(bookProvider: BookProvider) {
        this.bookProvider = bookProvider;
    }

    get books(): Book[] {
        return this.bookProvider.books;
    }
}