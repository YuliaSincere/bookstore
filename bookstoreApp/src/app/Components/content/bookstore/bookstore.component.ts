import { Component, OnInit } from '@angular/core'
import { BookProvider } from '../../../Services/bookprovider';
import { Book } from '../../../Models/book';

@Component({
    selector: 'app-bookstore',
    templateUrl: './bookstore.component.html',
    styleUrls: ['./bookstore.component.scss']
})

export class BookstoreComponent implements OnInit {
    public books: Book[];

    constructor(private bookProvider: BookProvider) {
        this.bookProvider = bookProvider;
    }

    ngOnInit(): void {
        this.bookProvider.getBooks()
            .subscribe((books: Book[]) => this.books = books);
    }
}