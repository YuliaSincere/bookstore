import { Component, Input } from '@angular/core'
import { Book } from 'src/app/Models/book';
@Component({
    selector: 'app-buyButton',
    templateUrl: './buyButton.component.html',
    styleUrls: ['./buyButton.component.scss']
})

export class BuyButtonComponent {
    @Input() //Входной параметр для компонента - тут Книга (отображение)
    public book: Book;
    onClick(){
        alert(this.book.id);
    }
}