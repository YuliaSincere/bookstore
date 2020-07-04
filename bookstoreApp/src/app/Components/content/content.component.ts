import { Component, OnInit } from '@angular/core'
import { CustomerService } from 'src/app/Services/CustomerService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {
    constructor(private router: Router, private customerService: CustomerService) {

        this.customerService = customerService;
    }
    ngOnInit(): void {
        if (!this.customerService.isCustomerIdExists) {
            this.customerService.readCustomerIdFromStorage();
            if (!this.customerService.isCustomerIdExists) {
                this.router.navigateByUrl('/');
            }
        }
    }
}