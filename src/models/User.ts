export interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phoneNumber: string;
  address?: string;
  birthday?: string;
  avatar?: string;
  gender?: boolean;
  email?: string;
  password: string;
  role?: 'user' | 'admin';
  status?: string;
  dateCreate?: string;
}
