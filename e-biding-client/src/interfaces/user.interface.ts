export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  companyName: string;
  companyAddress: string;
  phone: string;
  alternatePhone: string;
  RCNumber: string;
  postalCode: number;
  email: string;
  CACDoc: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

export interface ILoginForm {
  firstName: string;
  lastName: string;
  companyName: string;
  companyAddress: string;
  phone: string;
  alternatePhone: string;
  RCNumber: string;
  postalCode: number;
  email: string;
  CACDoc: any;
  password: string;
  confirmPassword: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
    access_token: string;
  };
}

export interface IUserResponse {
  success: boolean;
  message: string;
  data: IUser
}

