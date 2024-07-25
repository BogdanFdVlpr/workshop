import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Product} from "../../models/product/product.module";
import {Subscription} from "rxjs";
import {StoreService} from "../../services/store.service";

const ROWS_HEIGHT: {[id: number]: number} = { 1: 400, 3: 335, 4: 350}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
      private cartService: CartService,
      private storeService: StoreService,
  ) {
  }

  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getProducts();
  }

  onItemsCountChange(newCount: number) {
    this.count = newCount.toString();
    this.getProducts()
  }

  onSortChange(newSort: string) {
    this.sort = newSort;
    this.getProducts();
  }

  getProducts() {
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
        .subscribe((_products) => {
          this.products = _products;
        })
  }


  onColumnsCountChange(colsNum: number) {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }

  onShowCategory(newCategory: string) {
    this.category = newCategory;
    this.getProducts()
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
