import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductFilter } from '../../../core/models/product.model';
import { loadProducts, loadCategories, setFilter, clearFilter } from '../../../store/products/products.actions';
import {
  selectFilteredProducts,
  selectCategories,
  selectProductsLoading,
  selectProductsFilter
} from '../../../store/products/products.selectors';

@Component({
  standalone: false,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  categories$: Observable<string[]>;
  loading$: Observable<boolean>;
  filter$: Observable<ProductFilter>;
  private destroy$ = new Subject<void>();

  searchQuery = '';
  selectedCategory = '';
  sortBy = '';
  priceRange = { min: 0, max: 1000 };

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    this.products$ = this.store.select(selectFilteredProducts);
    this.categories$ = this.store.select(selectCategories);
    this.loading$ = this.store.select(selectProductsLoading);
    this.filter$ = this.store.select(selectProductsFilter);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts({}));
    this.store.dispatch(loadCategories());

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['search']) {
        this.searchQuery = params['search'];
        this.applyFilter();
      }
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.applyFilter();
      }
    });
  }

  applyFilter(): void {
    const filter: ProductFilter = {};
    if (this.searchQuery) filter.search = this.searchQuery;
    if (this.selectedCategory) filter.category = this.selectedCategory;
    if (this.sortBy) filter.sortBy = this.sortBy as ProductFilter['sortBy'];
    this.store.dispatch(setFilter({ filter }));
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.sortBy = '';
    this.store.dispatch(clearFilter());
    this.router.navigate(['/products']);
  }

  onViewProduct(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
