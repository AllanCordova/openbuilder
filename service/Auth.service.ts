import prisma from "@/lib/prisma";
import { generateToken, verifyToken } from "@/lib/token";
import { cookies } from "next/headers";
import { ValidationError } from "@/lib/errors";
import bcrypt from "bcrypt";
import { SignInData, SignUpData, UpdateData } from "@/types/Auth.dto";

export class AuthService {
  async signUp(data: SignUpData) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ValidationError("User already exists");
    }

    const password_hash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async signIn(data: SignInData) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new ValidationError("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new ValidationError("Invalid credentials");
    }

    const token = await generateToken(user.email);
    const cookieStore = await cookies();

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }

  async signOut() {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");

    return { success: true };
  }

  async getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return null;

    const decoded = await verifyToken(token);
    if (!decoded) return null;

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: {
        id: true,
        name: true,
        email: true,
        avatar_url: true,
        createdAt: true,
      },
    });

    return user;
  }

  async updateUser(data: UpdateData) {
    const user = await this.getCurrentUser();

    if (!user) {
      throw new ValidationError("Unauthenticated user!");
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        avatar_url: data.avatar_url,
      },
    });

    return updatedUser;
  }
}

export const authService = new AuthService();
