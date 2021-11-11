export type AuthState = {
  logged: boolean;
  token: string | null;
  currentUser: string | null;
  error: string | null;
};
