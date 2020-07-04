import { Component, OnInit, OnDestroy, Injectable } from '@angular/core'
import { BookProvider } from '../../../Services/BookProvider';
import { Book } from '../../../Models/book';
import * as signalR from '@microsoft/signalr';
import { Subscription } from 'rxjs';
import { SignalService } from 'src/app/Services/SignalService';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from 'src/app/Services/CustomerService';

@Component({
    selector: 'app-bookstore',
    templateUrl: './bookstore.component.html',
    styleUrls: ['./bookstore.component.scss']
})

@Injectable({
    providedIn: 'root',
})

export class BookstoreComponent implements OnInit,  OnDestroy {
    private removeBookFrom = 'api/cart/add'; //url to web api
    private onUpdateBookstoreSubscription: Subscription;

    public books: Book[];

    constructor(private bookProvider: BookProvider, private signalService: SignalService,
        private http: HttpClient, private customerService: CustomerService) {
        this.bookProvider = bookProvider;
        this.signalService = signalService;
        this.customerService = customerService;

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