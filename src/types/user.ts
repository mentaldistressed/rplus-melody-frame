
export interface User {
  id: string;
  username: string;
  password: string; // В реальном приложении пароли нужно хранить в хешированном виде
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
}
