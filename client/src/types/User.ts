// src/types/User.ts

export interface User {
  id: number;
  username: string;
  email: string;
  // Add other user-related fields as needed
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (userInfo: RegisterInfo) => Promise<void>;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterInfo {
  username: string;
  email: string;
  password: string;
}
