import { Component, Input } from '@angular/core'
import { Book } from 'src/app/Models/book';
import { BookInCartComponent } from '../bookInCart/bookInCart.component';
import { CartService } from 'src/app/Services/CartService';
@Component({
    selector: 'app-buyButton',
    templateUrl: './buyButton.component.html',
    styleUrls: ['./buyButton.component.scss']
})

export class BuyButtonComponent {
    @Input() //Входной параметр для компонента - тут Книга (отображение)
    public book: Book;

    /**
     *
     */
    constructor(private cartService: CartService) {
        this.cartService = cartService;
    }

    onClick(){
       // alert(this.book.id);
        this.cartService.addBookToCart(this.book.id);
    }
}