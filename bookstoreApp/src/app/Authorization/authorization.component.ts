import { Component } from '@angular/core';
import { Guid } from "guid-typescript";
import { Router } from '@angular/router';
import { CustomerService } from '../Services/CustomerService';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent {
    constructor(private router: Router, private customerService: CustomerService) {
        this.customerService = customerService;
     }
    customerId: string;
    async onClickEnter() {
        let guidString = this.customerId
            .toUpperCase()
            .replace("{", "")
            .replace("}", "");

        const g1 = Guid.parse(guidString);
        const g2 = Guid.parse('D374F71A-569B-4C37-94B3-A508904348D7');

        if (g1.equals(g2))
        {
            this.router.navigateByUrl('/bookstore');
        }

        this.customerService.customerId = g1;
    }

    async onClickGet() {
        this.customerService.customerId = Guid.create();
        this.router.navigateByUrl('/bookstore');
    }
}
