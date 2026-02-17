export type SafeUser = {
  id: string;
  email: string;
  username: string;
  createdAt: string;
};

export type AuthResponse = {
  user: SafeUser;
  token: string;
};
