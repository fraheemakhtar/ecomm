import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { loadProducts } from '../../../store/products/products.actions';
import { selectAllProducts, selectProductsLoading } from '../../../store/products/products.selectors';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;

  stats = [
    { icon: '📦', label: 'Total Products', value: '0', color: '#e94560' },
    { icon: '🛒', label: 'Total Orders', value: '142', color: '#0ea5e9' },
    { icon: '👥', label: 'Customers', value: '3,241', color: '#8b5cf6' },
    { icon: '💰', label: 'Revenue', value: '$48,295', color: '#10b981' }
  ];

  constructor(private store: Store) {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectProductsLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts({}));
    this.products$.subscribe(products => {
      this.stats[0].value = products.length.toString();
    });
  }
}
