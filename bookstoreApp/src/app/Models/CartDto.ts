import { BookInCart } from './bookInCart';

export interface CartDto {
    booksInCart: BookInCart[];
    allowToCheckout: boolean;
}
