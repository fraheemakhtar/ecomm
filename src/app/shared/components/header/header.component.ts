import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { selectCartItemCount } from '../../../store/cart/cart.selectors';
import { selectCurrentUser, selectIsAuthenticated } from '../../../store/auth/auth.selectors';
import { logout } from '../../../store/auth/auth.actions';
import { User } from '../../../core/models/user.model';

@Component({
  standalone: false,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItemCount$: Observable<number>;
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;
  searchQuery = '';
  menuOpen = false;

  constructor(private store: Store, private router: Router) {
    this.cartItemCount$ = this.store.select(selectCartItemCount);
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit(): void {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
    }
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
