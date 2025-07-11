'use server'
import { RefreshResponse } from "@/types";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getSession, setSession } from "../session/session";


export const axiosServer = axios.create({
  baseURL: process.env.BACKEND_URL,
})

axiosServer.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const session = await getSession()

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }

  return config
})

axiosServer.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalREquest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    if (error.response?.status === 401 && !originalREquest._retry) {
      originalREquest._retry = true;
      const session = await getSession()
      if (!session?.access_token) {
        throw new Error('Unauthorized')
      }

      try {
        const res: AxiosResponse<RefreshResponse> = await axios.post(`${process.env.BACKEND_URL}/auth/refresh`, {
          refresh_token: session.refresh_token
        })
        console.log("refresh response", { data: res.data });

        await setSession({
          ...session,
          access_token: res.data.data?.access_token,
          refresh_token: res.data.data?.refresh_token,
        })

        originalREquest.headers.Authorization = `Bearer ${res.data.data!.access_token}`;
        return axiosServer(originalREquest);
      } catch (err) {
        return Promise.reject(err instanceof Error ? err : new Error('Failed to refresh token'));
      }
    }
    return Promise.reject(error);
  }
)

