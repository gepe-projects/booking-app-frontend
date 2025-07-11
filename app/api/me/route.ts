import { axiosServer } from "@/lib/axios"
import { NextResponse } from "next/server"


export async function GET(request: Request) {
  try {
    const res = await axiosServer.get('/auth/me')

    return NextResponse.json(res.data.data)
  } catch (error) {
    return NextResponse.json({
      message: 'Internal server error',
      error
    })
  }
}