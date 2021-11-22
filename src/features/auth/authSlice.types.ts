import { TUser } from "../../app/services/auth";
export type AuthState = {
  logged: boolean;
  token: string | null;
  currentUser: TUser | null;
  error: string | null | undefined;
};

export type SignIn = {
  username: string;
  password: string;
};

export type ServerError = {
  error: string;
};

export type ServerResponse = {
  token: string;
};

export type SignUpBody = {
  name: string;
  email: string;
  username: string;
  password: string;
};
