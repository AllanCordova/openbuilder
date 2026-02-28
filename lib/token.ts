import { SignJWT, jwtVerify } from "jose";

const getSecretKey = () => new TextEncoder().encode(process.env.TOKEN_SECRET!);

export async function generateToken(email: string): Promise<string> {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecretKey());

  return token;
}

export async function verifyToken(
  token: string,
): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());

    return { email: payload.email as string };
  } catch (error) {
    return null;
  }
}
