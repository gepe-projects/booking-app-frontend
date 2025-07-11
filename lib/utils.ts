import { ApiError } from "@/types";
import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isAxiosApiError(error: unknown): error is AxiosError<ApiError> {
  return error instanceof AxiosError &&
    error.response?.data?.errors !== undefined;
}