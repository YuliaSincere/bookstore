import { Component, OnInit } from '@angular/core'
import { CustomerService } from 'src/app/Services/CustomerService';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    public customerId: string;
    constructor (private customerService: CustomerService) {
        this.customerService = customerService;
    }
    ngOnInit(): void {
        this.customerId = this.customerService.customerId.toString();
    }
}