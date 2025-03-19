export interface User {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  smartBandId?: number;
  role: 'ADMIN' | 'CLIENT';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
