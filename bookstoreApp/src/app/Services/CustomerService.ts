import { Injectable } from '@angular/core';
import { Guid } from "guid-typescript";

@Injectable({
    providedIn: 'root',
})

export class CustomerService {
    private _customerId : Guid;

    public get customerId(): Guid {
        return this._customerId;
    }
 
    public set customerId(CustomerId: Guid) {
        this._customerId = CustomerId;
    }
}