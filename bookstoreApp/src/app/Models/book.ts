export class Book {
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public count: number;
    constructor(id: number,
        namemessage: string,
        descriptionmessage: string,
        pricemessage: number,
        countmessage: number) {
        this.id = id;
        this.name = namemessage;
        this.description = descriptionmessage;
        this.price = pricemessage;
        this.count = countmessage;
    }
}

