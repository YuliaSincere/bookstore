import { Component, Input} from '@angular/core'
import { BookInCart } from '../../Models/bookInCart';

@Component({
    selector: 'app-bookInCart',
    templateUrl: './bookInCart.component.html',
    styleUrls: ['./bookInCart.component.scss']
})

export class BookInCartComponent {
    @Input() //Входной параметр для компонента - тут Книга (отображение)
    public bookInCart: BookInCart;
}