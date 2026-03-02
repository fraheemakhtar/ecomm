import { Product, ProductFilter } from '../../core/models/product.model';

export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  categories: string[];
  filter: ProductFilter;
  loading: boolean;
  error: string | null;
}

export const initialProductsState: ProductsState = {
  products: [],
  selectedProduct: null,
  categories: [],
  filter: {},
  loading: false,
  error: null
};
