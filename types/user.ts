export type UserRole = 'buyer' | 'seller' | 'both' | 'admin';
export type UserStatus = 'active' | 'suspended' | 'deleted';

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  role: UserRole;
  profile_image_url?: string;
  status: UserStatus;
  created_at: string;
  updated_at?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  password_confirm: string;
  name: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refresh_token?: string;
}

