export type SignUpResultDto = {
  id: string;
  name: string;
  email: string;
};

export type SignInResultDto = {
  id: string;
  name: string;
  email: string;
  token: string;
};

export type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export type UpdateData = {
  name?: string;
  avatar_url?: string;
};
