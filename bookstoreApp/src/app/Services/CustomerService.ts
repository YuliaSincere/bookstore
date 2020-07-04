import { Injectable } from '@angular/core';
import { Guid } from "guid-typescript";

const customerIdLocalStorageKey = 'customerId';

@Injectable({
    providedIn: 'root',
})

export class CustomerService {
    
    private _customerId : Guid;
    
    /***
     * Метод получения свойства идентификатора пользователя (возвращающий значения).
     */
    public get customerId(): Guid {
        return this._customerId;
    }

    /**
     * Метод устанавливающий значения свойства идентификатора пользователя.
     */
    public set customerId(customerId: Guid) {
        this._customerId = customerId;
        localStorage.setItem(customerIdLocalStorageKey, this.customerId.toString());
    }

    /**
     * Возвращает признак того, что идентификатор пользователя задан.
    */
    public get isCustomerIdExists(): boolean {
        return ((this._customerId !== null) 
        && ( typeof this._customerId !== 'undefined'));
    }

    readCustomerIdFromStorage(): void {
        const storedCustomerId = localStorage.getItem(customerIdLocalStorageKey);
        console.log(storedCustomerId);
        if (Guid.isGuid(storedCustomerId))
        {
            this._customerId = Guid.parse(storedCustomerId);
        }
    }
}