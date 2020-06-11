import { Book } from '../Models/book'

export class BookProvider {
    private booksArray: Book[] = [
        new Book(1, 'firstbook', 'This is a first book', 300, 89),
        new Book(2, 'secondbook', 'This is a second book', 800, 456),
        new Book(3, 'thirdbook', 'This is a third book', 600, 46),
        new Book(4, 'fourthbook', 'This is a fourth book', 360, 5678),
        new Book(5, 'fifthbook', 'This is a fifth book', 9000, 1234)];

    get books(): Book[] {
        return this.booksArray;
    }
}