export interface User {
  firstName: string;
  lastName: string;
  fullName?: string;
  phoneNumber: string;
  password: string;
  address?: string;
  birthday?: string;
  avatar?: string;
  gender?: boolean;
  email?: string;
  role?: 'user' | 'admin';
  status?: 'activated' | 'blocked';
  dateCreate?: string;
}
