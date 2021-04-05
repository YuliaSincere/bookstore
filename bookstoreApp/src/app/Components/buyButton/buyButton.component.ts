import { Component, Input } from '@angular/core'
import { Book } from 'src/app/Models/book';
import { BookInCartComponent } from '../bookInCart/bookInCart.component';
import { CartService } from 'src/app/Services/CartService';
import { MatDialog } from '@angular/material/dialog';
import { NoMoreBook } from '../no-more-book/no-more-book.component';

@Component({
    selector: 'app-buyButton',
    templateUrl: './buyButton.component.html',
    styleUrls: ['./buyButton.component.scss']
})

export class BuyButtonComponent{
    @Input() //Входной параметр для компонента - тут Книга (отображение)
    public book: Book;

    /**
     *
     */
    constructor(private cartService: CartService, private dialog: MatDialog) {
        this.cartService = cartService;
    }

    async onClick(){
        const result = await this.cartService.addBookToCart(this.book.id);
        if (result && result.length > 0)
        {
            const dialogRef = this.dialog.open(NoMoreBook);
        }
    }
}