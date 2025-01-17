import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../models/product/product.module";

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.scss'
})
export class ProductBoxComponent {

  @Input() fullWidthMode = false;

  @Input() product: Product | undefined;

  @Output() addToCart = new EventEmitter();

  onAddToCart() {
    this.addToCart.emit(this.product)
  }
}
