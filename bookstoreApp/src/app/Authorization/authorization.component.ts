import { Component } from '@angular/core';
import { Guid } from "guid-typescript";
import { Router } from '@angular/router';
import { CustomerService } from '../Services/CustomerService';
import { GuidService } from '../Services/GuidService';

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
        const guid = GuidService.toGuid(this.customerId);

        if (!guid) {
            return;
        }

        this.customerService.customerId = guid;
        this.router.navigateByUrl('/bookstore');
    }

    async onClickGet() {
        var testId = Guid.create();
        var test = testId.toString();
        const guid = GuidService.toGuid(test);
        if (!guid) {
            return;
        }
        this.customerService.customerId = guid;
        this.router.navigateByUrl('/bookstore');
    }
}
