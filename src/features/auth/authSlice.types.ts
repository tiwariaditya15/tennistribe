export type TAuthState = {
  logged: boolean;
  token: string | null;
  currentUser: string | null;
  error: string | null | undefined;
};

export type TSignIn = {
  username: string;
  password: string;
};

export type TServerError = {
  error: string;
};

export type TServerResponse = {
  token: string;
};

export type TSignUpBody = {
  name: string;
  email: string;
  username: string;
  password: string;
};
