import { createReducer, on } from '@ngrx/store';
import { CartState, initialCartState } from './cart.state';
import * as CartActions from './cart.actions';
import { CartItem } from '../../core/models/cart.model';

function saveToStorage(items: CartItem[]): void {
  localStorage.setItem('cart_items', JSON.stringify(items));
}

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.addToCart, (state, { product, quantity = 1 }) => {
    const existingItem = state.items.find(i => i.product.id === product.id);
    let items: CartItem[];
    if (existingItem) {
      items = state.items.map(i =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
      );
    } else {
      items = [...state.items, { product, quantity }];
    }
    saveToStorage(items);
    return { ...state, items };
  }),
  on(CartActions.removeFromCart, (state, { productId }) => {
    const items = state.items.filter(i => i.product.id !== productId);
    saveToStorage(items);
    return { ...state, items };
  }),
  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    if (quantity <= 0) {
      const items = state.items.filter(i => i.product.id !== productId);
      saveToStorage(items);
      return { ...state, items };
    }
    const items = state.items.map(i =>
      i.product.id === productId ? { ...i, quantity } : i
    );
    saveToStorage(items);
    return { ...state, items };
  }),
  on(CartActions.clearCart, () => {
    saveToStorage([]);
    return { items: [] };
  }),
  on(CartActions.loadCartSuccess, (state, { items }) => ({ ...state, items }))
);
