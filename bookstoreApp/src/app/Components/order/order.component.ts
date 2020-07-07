import { Component, OnInit } from '@angular/core';
import { BookInOrder } from 'src/app/Models/bookInOrder';
import { Guid } from 'guid-typescript';
import { CartService } from 'src/app/Services/CartService';
import { ActivatedRoute } from '@angular/router';
import { GuidService } from 'src/app/Services/GuidService';


@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
    public booksInOrder: BookInOrder[];
    private orderId: string;
    constructor(private route: ActivatedRoute, private cartService: CartService)
    {
        this.cartService = cartService;
    }
       /**
     * Обновление заказа.
     */
    private async getBookInOrder(orderId: Guid) {
        try {
            this.booksInOrder = await this.cartService.getBooksInOrder(orderId);

        } catch (error) {
            console.log(error);
        }
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(param => {
            const orderId = GuidService.toGuid(param.get("orderId"));

            if (!orderId) {
                return;
            }

            this.getBookInOrder(orderId);
        });
      }
}
