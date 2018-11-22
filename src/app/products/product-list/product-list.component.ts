import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";

import { Product } from "../product";
import { ProductService } from "../product.service";
import { Store, select } from "@ngrx/store";

import * as fromProduct from "../state/products.reducer";
import * as productActions from '../state/products.actions';

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Products";
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;


  constructor(
    private productService: ProductService,
    private store: Store<fromProduct.State>
  ) {}

  ngOnInit(): void {
   this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      selectedProduct => (this.selectedProduct = selectedProduct)
    );

    this.productService
      .getProducts()
      .subscribe(
        (products: Product[]) => (this.products = products),
        (err: any) => (this.errorMessage = err.error)
      );
    this.store
      .pipe(select(fromProduct.getShowProductCode))
      .subscribe(value =>this.displayCode = value);
  }

  ngOnDestroy(): void {
  
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
   //  this.productService.changeSelectedProduct(this.productService.newProduct());
   this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
    // this.productService.changeSelectedProduct(product);
  }
}
