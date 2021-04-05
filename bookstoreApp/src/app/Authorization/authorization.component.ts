import { Component } from '@angular/core';
import { Guid } from "guid-typescript";
import { Router } from '@angular/router';
import { CustomerService } from '../Services/CustomerService';
import { GuidService } from '../Services/GuidService'; 
import { Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog'; 
import { NotGuidMessageBox } from '../Components/notGuidMessageBox/notGuidMessageBox.component';

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent {
    constructor(private router: Router, private customerService: CustomerService, private dialog: MatDialog) {
        this.customerService = customerService;
     }
    customerId: string;
    async onClickEnter() {
        const guid = GuidService.toGuid(this.customerId);

        if (!guid) {
            const dialogRef = this.dialog.open(NotGuidMessageBox);
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
