import { User } from '../../core/models/user.model';

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: localStorage.getItem('jwt_token'),
  loading: false,
  error: null
};
