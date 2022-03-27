import { serialize } from "cookie";
import { NextApiResponse } from "next";

const TOKEN_NAME = "api_token";
// const MAX_AGE = 60 * 60 * 8;
const MAX_AGE = 9999 * 9999 * 9999;

function createCookie(name: string, data: any, options = {}) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    ...options,
  });
}

function setTokenCookie(res: NextApiResponse, token: string) {
  res.setHeader("Set-Cookie", [
    createCookie(TOKEN_NAME, token),
    createCookie("authed", true, { httpOnly: false }),
  ]);
}

function clearAuthCookies(res: NextApiResponse) {
  res.setHeader("Set-Cookie", [
    serialize(TOKEN_NAME, "", {
      maxAge: 0,
      path: "/",
    }),
    serialize("authed", "false", { maxAge: 0, path: "/" }),
  ]);
}

function getAuthToken(cookies: any) {
  return cookies[TOKEN_NAME];
}

export default { setTokenCookie, getAuthToken, clearAuthCookies };
