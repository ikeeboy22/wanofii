import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "wanofii_admin_session";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 24 * 7;

function sessionSecret() {
  return process.env.WANOFII_SESSION_SECRET;
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.WANOFII_ADMIN_PASSWORD && sessionSecret());
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.WANOFII_ADMIN_PASSWORD;
  if (!expected) return false;
  const suppliedBytes = Buffer.from(password);
  const expectedBytes = Buffer.from(expected);
  return suppliedBytes.length === expectedBytes.length && timingSafeEqual(suppliedBytes, expectedBytes);
}

export function createAdminSession() {
  const secret = sessionSecret();
  if (!secret) throw new Error("WANOFII_SESSION_SECRET is not configured.");
  const expires = Math.floor(Date.now() / 1000) + ADMIN_SESSION_SECONDS;
  const signature = createHmac("sha256", secret).update(String(expires)).digest("hex");
  return `${expires}.${signature}`;
}

export function isValidAdminSession(value?: string) {
  const secret = sessionSecret();
  if (!secret || !value) return false;
  const [expiresText, signature] = value.split(".");
  const expires = Number(expiresText);
  if (!Number.isInteger(expires) || expires <= Math.floor(Date.now() / 1000) || !signature) return false;
  const expected = createHmac("sha256", secret).update(String(expires)).digest("hex");
  const suppliedBytes = Buffer.from(signature);
  const expectedBytes = Buffer.from(expected);
  return suppliedBytes.length === expectedBytes.length && timingSafeEqual(suppliedBytes, expectedBytes);
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return origin !== null && origin === new URL(request.url).origin;
}
