import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
})
export class SignalService {

    private readonly onUpdateBookstore: Subject<any>;
    private readonly onUpdateCart: Subject<string>;

    constructor() {
        this.onUpdateBookstore = new Subject<any>();
        this.onUpdateCart = new Subject<string>();

        let connectionUrl = "";
        if (!environment.production)
        {
            connectionUrl = environment.signalRServer;
        }

        connectionUrl += "/hubs";

        const connection = new signalR.HubConnectionBuilder()
            .withAutomaticReconnect()
            .withUrl(connectionUrl)
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