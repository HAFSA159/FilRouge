import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../shared/models/user.model';
import * as AuthActions from './auth.actions';
export type { AuthState } from '../../shared/models/user.model';

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Register
  on(AuthActions.register, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    loading: false,
    error: null
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Logout
  on(AuthActions.logout, state => ({
    ...state,
    loading: true
  })),
  on(AuthActions.logoutSuccess, state => ({
    ...state,
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  })),

  // Get Current User
  on(AuthActions.getCurrentUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.getCurrentUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    loading: false,
    error: null
  })),
  on(AuthActions.getCurrentUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
