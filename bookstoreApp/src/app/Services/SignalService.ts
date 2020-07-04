import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Guid } from "guid-typescript";
import { OnUpdateCartArgs } from './OnUpdateCartArgs';


@Injectable({
    providedIn: 'root',
})
export class SignalService {

    private readonly onUpdateBookstore: Subject<any>;
    private readonly onUpdateCart: Subject<OnUpdateCartArgs>;

    constructor() {
        this.onUpdateBookstore = new Subject<any>();
        this.onUpdateCart = new Subject<OnUpdateCartArgs>();

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
        connection.on("SendUpdateCart", (customerId: string, allowToCheckout: boolean) => {
            var guidCustomerId = Guid.parse(customerId.toUpperCase());
            this.onUpdateCart.next({allowToCheckout: allowToCheckout , customerId: guidCustomerId});
        });
        connection.start().catch(err => document.write(err));

    }
    get onUpdateBookstore$(): Observable<any> {
        return this.onUpdateBookstore.asObservable();
    }
    get onUpdateCart$(): Observable<OnUpdateCartArgs> {
        return this.onUpdateCart.asObservable();
    }
}