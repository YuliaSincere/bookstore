import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SignalService {

    private readonly onUpdateBookstore: Subject<any>;
    private readonly onUpdateCart: Subject<string>;

    constructor() {
        this.onUpdateBookstore = new Subject<any>();
        this.onUpdateCart = new Subject<string>();
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5000/hubs")
            .build();

        connection.on("SendUpdateBookstore", () => {
            this.onUpdateBookstore.next();
        });
        connection.on("SendUpdateCart", (customerId: string) => {
            this.onUpdateCart.next(customerId);
        });
        connection.start().catch(err => document.write(err));

    }
    get onUpdateBookstore$(): Observable<any> {
        return this.onUpdateBookstore.asObservable();
    }
    get onUpdateCart$(): Observable<string> {
        return this.onUpdateCart.asObservable();
    }
}