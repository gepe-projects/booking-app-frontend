import { User } from "../users/user"

export interface LoginResponse {
  status: string
  data: Data
}

interface Data {
  access_token: string
  refresh_token: string
  user: User
}

export interface RefreshResponse {
  status: string;
  data?: {
    access_token: string;
    refresh_token: string;
  };
  errors?: string
}

