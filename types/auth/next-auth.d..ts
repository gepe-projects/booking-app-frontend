import "next-auth";
import type { User as UserData } from "../types"; // Sesuaikan path

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    full_name: string;
    phone_number: string;
    role: string;
    avatar_url: string;
    access_token: string;
    refresh_token: string;
  }

  interface Session {
    user: User; // Gunakan tipe User yang sudah didefinisikan
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    access_token: string;
    refresh_token: string;
    email: string;
    full_name: string;
    phone_number: string;
    role: string;
    avatar_url: string;
  }
}