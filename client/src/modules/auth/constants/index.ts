export interface RegisterBody {
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: string[];
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface AuthUser {
  _id: string;
  isActive: boolean;
  email: string;
  name: string;
  phone: string;
  address: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  accessToken: string;
}

export enum USER_ROLE {
  TEACHER = 'teacher',
  STUDENT = 'student'
}