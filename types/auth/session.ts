export interface SessionData {
  access_token?: string;
  refresh_token?: string;
  user?: {
    id: string;
    email: string;
    full_name: string;
    phone_number: string;
    role: string;
    avatar_url: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };
  isLoggedIn: boolean;
}
