import { CartItem } from '../../core/models/cart.model';

export interface CartState {
  items: CartItem[];
}

function loadCartFromStorage(): CartItem[] {
  try {
    const saved = localStorage.getItem('cart_items');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export const initialCartState: CartState = {
  items: loadCartFromStorage()
};
