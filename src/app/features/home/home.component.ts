import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { loadProducts, loadCategories, setFilter } from '../../store/products/products.actions';
import { selectAllProducts, selectCategories, selectProductsLoading } from '../../store/products/products.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]>;
  categories$: Observable<string[]>;
  loading$: Observable<boolean>;

  features = [
    { icon: '🚀', title: 'Fast Delivery', desc: 'Get your orders in 24-48 hours' },
    { icon: '🔒', title: 'Secure Payment', desc: 'SSL encrypted payment with Stripe' },
    { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free return policy' },
    { icon: '🎧', title: '24/7 Support', desc: 'Round-the-clock customer service' }
  ];

  constructor(private store: Store, private router: Router) {
    this.products$ = this.store.select(selectAllProducts);
    this.categories$ = this.store.select(selectCategories);
    this.loading$ = this.store.select(selectProductsLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts({}));
    this.store.dispatch(loadCategories());
  }

  onViewProduct(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }

  onCategoryClick(category: string): void {
    this.store.dispatch(setFilter({ filter: { category } }));
    this.router.navigate(['/products']);
  }

  getFeaturedProducts(products: Product[]): Product[] {
    return products.slice(0, 8);
  }
}
