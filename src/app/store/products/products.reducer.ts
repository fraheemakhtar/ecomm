import { createReducer, on } from '@ngrx/store';
import { ProductsState, initialProductsState } from './products.state';
import * as ProductsActions from './products.actions';

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductsActions.loadProducts, state => ({ ...state, loading: true, error: null })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProductsActions.loadProduct, state => ({ ...state, loading: true, error: null })),
  on(ProductsActions.loadProductSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    loading: false
  })),
  on(ProductsActions.loadProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ProductsActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories
  })),
  on(ProductsActions.setFilter, (state, { filter }) => ({ ...state, filter })),
  on(ProductsActions.clearFilter, state => ({ ...state, filter: {} }))
);
