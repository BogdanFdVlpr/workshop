import {Component, OnInit} from '@angular/core';
import {Cart, CartItem} from "../../models/cart/cart.module";
import {CartService} from "../../services/cart.service";
import {HttpClient} from "@angular/common/http";
import {loadStripe} from "@stripe/stripe-js";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  constructor(private cartService: CartService, private http: HttpClient) {
  }

  cart: Cart = {items: [{
      product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 150,
      quantity: 1,
      id: 1,
    },
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 3,
        id: 2,
      }]};

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  ngOnInit() {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity( item: CartItem) {
    this.cartService.addToCart(item)
  }

  onRemoveQuantity( item: CartItem) {
    this.cartService.removeQuantity(item);
  }

  onCheckout() {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }). subscribe(async(res:any) => {
      let stripe = await loadStripe('pk_test_51PgTp1Rq0wDNzn3aizAM0JwTmKSfB8cqeYcv5JBnLdj0dqpcmeQ4pb704U0P3QYdetAzsiGXJ7HCJLceE7raZ0AI00Gw0fULF2');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
