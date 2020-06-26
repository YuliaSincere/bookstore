export class BookInCart {
    public name: string;
    public description: string;
    public price: number;
    public bookCount: number;
    constructor(namemessage: string,
        descriptionmessage: string,
        pricemessage: number,
        bookCountmessage: number) {
        this.name = namemessage;
        this.description = descriptionmessage;
        this.price = pricemessage;
        this.bookCount = bookCountmessage;
    }
}

