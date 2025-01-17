import {Component, Input} from '@angular/core';
import {Cart, CartItem} from "../../models/cart/cart.module";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private cartService: CartService) {
  }

  private _cart: Cart = { items: []}
  itemQuantity = 0;

  @Input()
    get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart

      this.itemQuantity = cart.items
          .map((item) => item.quantity)
          .reduce((prev, current) => prev + current, 0)
  }

    getTotal(items: Array<CartItem>): number {
        return this.cartService.getTotal(items)
    }

    onClearCart() {
      this.cartService.clearCart()
    }

}
