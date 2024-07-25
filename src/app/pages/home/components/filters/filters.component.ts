import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {StoreService} from "../../../../services/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements  OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription |undefined;

  constructor(private storeService: StoreService) {

  }

  categories: Array<string> | undefined;

  onShowCategory(category:string) {
    this.showCategory.emit(category)
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getAllCategories()
        .subscribe((response) => {
          this.categories = response;
        })
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

}
