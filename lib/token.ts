import { SignJWT, jwtVerify } from "jose";

const getSecretKey = () => new TextEncoder().encode(process.env.TOKEN_SECRET!);

export async function generateToken(userId: string): Promise<string> {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecretKey());

  return token;
}

export async function verifyToken(
  token: string,
): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());

    return { userId: payload.userId as string };
  } catch (error) {
    return null;
  }
}
