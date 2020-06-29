import { Component, OnInit, OnDestroy } from '@angular/core'
import { BookProvider } from '../../../Services/BookProvider';
import { Book } from '../../../Models/book';
import * as signalR from '@microsoft/signalr';
import { Subscription } from 'rxjs';
import { SignalService } from 'src/app/Services/SignalService';

@Component({
    selector: 'app-bookstore',
    templateUrl: './bookstore.component.html',
    styleUrls: ['./bookstore.component.scss']
})

export class BookstoreComponent implements OnInit,  OnDestroy {

    private onUpdateBookstoreSubscription: Subscription;

    public books: Book[];

    constructor(private bookProvider: BookProvider, private signalService: SignalService) {
        this.bookProvider = bookProvider;
        this.signalService = signalService;

        this.onUpdateBookstoreSubscription = this.signalService.onUpdateBookstore$.subscribe(any => {
            this.getBooks();
        })
    }
    ngOnDestroy(): void {
        this.onUpdateBookstoreSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.getBooks();
    }

    private async getBooks() {
        this.books = await this.bookProvider.getBooks();
    }
}