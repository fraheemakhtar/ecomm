import { createAction, props } from '@ngrx/store';
import { Product } from '../../core/models/product.model';
import { CartItem } from '../../core/models/cart.model';

export const addToCart = createAction('[Cart] Add Item', props<{ product: Product; quantity?: number }>());
export const removeFromCart = createAction('[Cart] Remove Item', props<{ productId: number }>());
export const updateQuantity = createAction('[Cart] Update Quantity', props<{ productId: number; quantity: number }>());
export const clearCart = createAction('[Cart] Clear');
export const loadCart = createAction('[Cart] Load');
export const loadCartSuccess = createAction('[Cart] Load Success', props<{ items: CartItem[] }>());
