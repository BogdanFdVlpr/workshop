import {Component, OnInit} from '@angular/core';
import {Cart} from "./models/cart/cart.module";
import {CartService} from "./services/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cart: Cart = {items: []};

  constructor(private  cartService: CartService) {
  }
  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    })
  }

}
