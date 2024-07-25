import { Component } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Product} from "../../models/product/product.module";

const ROWS_HEIGHT: {[id: number]: number} = { 1: 400, 2: 335, 4: 350}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private cartService: CartService) {
  }

  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  onColumnsCountChange(colsNum: number) {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }

  onShowCategory(newCategory: string) {
    this.category = newCategory
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }

}
