import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';

export const selectProductsState = createFeatureSelector<ProductsState>('products');
export const selectAllProducts = createSelector(selectProductsState, state => state.products);
export const selectSelectedProduct = createSelector(selectProductsState, state => state.selectedProduct);
export const selectCategories = createSelector(selectProductsState, state => state.categories);
export const selectProductsLoading = createSelector(selectProductsState, state => state.loading);
export const selectProductsError = createSelector(selectProductsState, state => state.error);
export const selectProductsFilter = createSelector(selectProductsState, state => state.filter);

export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectProductsFilter,
  (products, filter) => {
    let filtered = [...products];
    if (filter.category) {
      filtered = filtered.filter(p => p.category === filter.category);
    }
    if (filter.search) {
      const search = filter.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)
      );
    }
    if (filter.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filter.minPrice!);
    }
    if (filter.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filter.maxPrice!);
    }
    if (filter.sortBy) {
      switch (filter.sortBy) {
        case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
        case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
        case 'rating': filtered.sort((a, b) => b.rating.rate - a.rating.rate); break;
      }
    }
    return filtered;
  }
);
