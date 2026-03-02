import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectCartItems = createSelector(selectCartState, state => state.items);
export const selectCartTotal = createSelector(selectCartItems, items =>
  items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
);
export const selectCartItemCount = createSelector(selectCartItems, items =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);
export const selectCartEmpty = createSelector(selectCartItems, items => items.length === 0);
