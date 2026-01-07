export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  avatar: string;
  createdAt: string;
}

export interface UserActivity {
  id: string;
  action: string;
  timestamp: string;
}
