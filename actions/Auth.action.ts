"use server";

import { Wrapper } from "@/lib/wrappers/wrapper";
import { authService } from "@/service/Auth.service";
import { signInSchema, signUpSchema } from "@/schemas/Auth.schema";

export const signUp = Wrapper.publicValidated(signUpSchema, async (data) => {
  return await authService.signUp(data);
});

export const signIn = Wrapper.publicValidated(signInSchema, async (data) => {
  return await authService.signIn(data);
});

export const signOut = Wrapper.public(async () => {
  return await authService.signOut();
});

export const getCurrentUser = Wrapper.public(async () => {
  return await authService.getCurrentUser();
});
