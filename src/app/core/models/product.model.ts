export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
  stock?: number;
}

export interface ProductRating {
  rate: number;
  count: number;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}
