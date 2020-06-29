import { Component, OnInit } from '@angular/core'
import { BookProvider } from '../../../Services/BookProvider';
import { Book } from '../../../Models/book';
import * as signalR from '@microsoft/signalr';

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
        this.getBooks();
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5000/hubs")
            .build();

        connection.on("SendUpdateBookstore", (CustomerId: string) => {
            console.log('puk2');
            this.getBooks();
        });
        connection.start().catch(err => document.write(err));
    }

    private async getBooks() {
        this.books = await this.bookProvider.getBooks();
    }
}