import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import { logout } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user$: Observable<User | null>;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectCurrentUser);
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
