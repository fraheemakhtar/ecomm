import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../../core/models/product.model';
import { addToCart } from '../../../store/cart/cart.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() viewDetail = new EventEmitter<Product>();

  constructor(private store: Store) {}

  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.store.dispatch(addToCart({ product: this.product, quantity: 1 }));
  }

  onViewDetail(): void {
    this.viewDetail.emit(this.product);
  }
}
