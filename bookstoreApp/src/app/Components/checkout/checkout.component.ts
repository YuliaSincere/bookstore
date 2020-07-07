import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Services/CustomerService';
import { SignalService } from 'src/app/Services/SignalService';
import { CartService } from 'src/app/Services/CartService';
import { Subscription } from 'rxjs';
import { BookInOrder } from 'src/app/Models/bookInOrder';
import { Guid } from 'guid-typescript';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnDestroy{
    public orderUrl: string;
    private orderSubscription: Subscription;
    public booksInOrder: BookInOrder[];
    private readonly router: Router;
    constructor( private cartService: CartService, private signalService: SignalService,private customerService: CustomerService) 
    {
        this.cartService = cartService;
        this.signalService = signalService;
        this.customerService = customerService;
        this.orderSubscription = this.signalService.onUpdateOrder$.subscribe(args => {
            console.log(this.customerService.customerId);
            if (args.customerId.equals(this.customerService.customerId)) 
            {
                this.orderUrl = "/order?orderId=" + this.customerService.customerId.toString();
            }
        })
    }
    

    ngOnDestroy(): void {
        this.orderSubscription.unsubscribe();
    }

  
}
