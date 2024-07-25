import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../models/product/product.module";

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.scss'
})
export class ProductBoxComponent {

  @Input() fullWidthMode = false;

  product: Product | undefined = {
    id: 1,
    title: 'Snickers',
    price: 150,
    category: 'shoes',
    description: 'Description',
    image: 'https://via.placeholder.com/150',
  };

  @Output() addToCart = new EventEmitter();

  onAddToCart() {
    this.addToCart.emit(this.product)
  }
}
