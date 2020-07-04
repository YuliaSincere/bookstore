import { Component, Input } from '@angular/core'
import { Book } from 'src/app/Models/book';
import { CartService } from 'src/app/Services/CartService';
import { BookInCart } from 'src/app/Models/bookInCart';
@Component({
    selector: 'app-buttonNotBuy',
    templateUrl: './buttonNotBuy.component.html',
    styleUrls: ['./buttonNotBuy.component.scss']
})

export class ButtonNotBuyComponent {
    @Input() //Входной параметр для компонента - тут Книга (отображение)
    public book: BookInCart;

    /**
     *
     */
    constructor(private cartService: CartService) {
        this.cartService = cartService;
    }

    async onClick(){
        const result = await this.cartService.removeBookFromCart(this.book.bookId);
    }
}