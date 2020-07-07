import { Component, Input} from '@angular/core'
import { BookInOrder } from '../../Models/bookInOrder';

@Component({
    selector: 'app-bookInOrder',
    templateUrl: './bookInOrder.component.html',
    styleUrls: ['./bookInOrder.component.scss']
})

export class BookInOrderComponent {
    @Input() //Входной параметр для компонента - тут Книга (отображение)
    public bookInOrder: BookInOrder;
}