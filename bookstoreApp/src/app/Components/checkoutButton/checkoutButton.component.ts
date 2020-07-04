import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/Services/CartService';
@Component({
    selector: 'app-checkoutButton',
    templateUrl: './checkoutButton.component.html',
    styleUrls: ['./checkoutButton.component.scss']
})

export class CheckoutButtonnComponent{
    @Input() //Входной параметр для компонента - тут Книга (отображение)
    public cart: CartService;
    async onClick(){
    }
}