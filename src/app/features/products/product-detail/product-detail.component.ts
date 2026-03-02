import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { loadProduct } from '../../../store/products/products.actions';
import { selectSelectedProduct, selectProductsLoading } from '../../../store/products/products.selectors';
import { addToCart } from '../../../store/cart/cart.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product | null>;
  loading$: Observable<boolean>;
  quantity = 1;
  addedToCart = false;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.product$ = this.store.select(selectSelectedProduct);
    this.loading$ = this.store.select(selectProductsLoading);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadProduct({ id }));
  }

  onAddToCart(product: Product): void {
    this.store.dispatch(addToCart({ product, quantity: this.quantity }));
    this.addedToCart = true;
    setTimeout(() => this.addedToCart = false, 3000);
  }

  increment(): void { this.quantity++; }
  decrement(): void { if (this.quantity > 1) this.quantity--; }
}
