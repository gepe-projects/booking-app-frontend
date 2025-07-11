import { SessionData } from "@/types/auth/session";
import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: process.env.SESSION_COOKIE_NAME!,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn
  }

  return session
}

export async function setSession(data: SessionData): Promise<SessionData> {
  const session = await getSession()
  session.user = data.user
  session.access_token = data.access_token
  session.refresh_token = data.refresh_token
  session.isLoggedIn = data.isLoggedIn

  await session.save()
  return session
}