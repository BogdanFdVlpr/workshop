import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CartModule { }

export interface Cart {
  items: Array<CartItem>;
}
export interface CartItem {
  product: string,
  name: string,
  price: number,
  quantity: number,
  id: number,
}
