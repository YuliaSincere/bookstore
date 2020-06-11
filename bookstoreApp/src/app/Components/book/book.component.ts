import { Component, Input} from '@angular/core'
import { Book } from '../Models/book';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})

export class BookComponent {
    @Input() //Входной параметр для компонента - тут Книга (отображение)
    public book: Book;
}