import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CartItem } from '../../core/models/cart.model';
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  selectCartEmpty
} from '../../store/cart/cart.selectors';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  items$: Observable<CartItem[]>;
  total$: Observable<number>;
  itemCount$: Observable<number>;
  isEmpty$: Observable<boolean>;

  constructor(private store: Store, private router: Router) {
    this.items$ = this.store.select(selectCartItems);
    this.total$ = this.store.select(selectCartTotal);
    this.itemCount$ = this.store.select(selectCartItemCount);
    this.isEmpty$ = this.store.select(selectCartEmpty);
  }

  onUpdateQuantity(productId: number, quantity: number): void {
    this.store.dispatch(updateQuantity({ productId, quantity }));
  }

  onRemoveItem(productId: number): void {
    this.store.dispatch(removeFromCart({ productId }));
  }

  onClearCart(): void {
    this.store.dispatch(clearCart());
  }

  onCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
