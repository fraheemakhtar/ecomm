import { createAction, props } from '@ngrx/store';
import { Product, ProductFilter } from '../../core/models/product.model';

export const loadProducts = createAction('[Products] Load', props<{ filter?: ProductFilter }>());
export const loadProductsSuccess = createAction('[Products] Load Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Products] Load Failure', props<{ error: string }>());

export const loadProduct = createAction('[Products] Load One', props<{ id: number }>());
export const loadProductSuccess = createAction('[Products] Load One Success', props<{ product: Product }>());
export const loadProductFailure = createAction('[Products] Load One Failure', props<{ error: string }>());

export const loadCategories = createAction('[Products] Load Categories');
export const loadCategoriesSuccess = createAction('[Products] Load Categories Success', props<{ categories: string[] }>());

export const setFilter = createAction('[Products] Set Filter', props<{ filter: ProductFilter }>());
export const clearFilter = createAction('[Products] Clear Filter');
