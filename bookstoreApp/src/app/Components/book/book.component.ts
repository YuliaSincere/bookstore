import { Component, Input} from '@angular/core'
import { Book } from '../../Models/book';
import { BookInCart } from '../../Models/bookInCart';
import { BookProvider } from 'src/app/Services/BookProvider';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})

export class BookComponent {
    @Input() //Входной параметр для компонента - тут Книга (отображение)
    public book: Book;
    public bookInCart: BookInCart;
    public imageUrl: string;

    // constructor(private bookProvider: BookProvider)
    // {
    //     this.bookProvider = bookProvider;
    //     this.imageUrl = this.bookProvider.
    // }
}