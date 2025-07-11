import { axiosServer } from "@/lib/axios";
import { setSession } from "@/lib/session/session";
import { LoginResponse } from "@/types";
import { AxiosError, AxiosResponse } from "axios";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const res: AxiosResponse<LoginResponse> = await axiosServer.post('/auth/login', {
      email,
      password
    })
    await setSession({
      ...res.data.data,
      isLoggedIn: true
    })
    return NextResponse.json({
      message: res.data.status,
    })
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ ...error.response?.data }, { status: error.response?.status })
    }
    return NextResponse.json({
      message: 'Internal server error',
      error
    }, { status: 500 })
  }
}