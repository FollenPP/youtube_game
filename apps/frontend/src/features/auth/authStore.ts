import { create } from 'zustand';
import { loginRequest, meRequest, registerRequest } from './auth.api';
import type { SafeUser } from './auth.types';

type AuthState = {
  user: SafeUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  register: (payload: { email: string; username: string; password: string }) => Promise<void>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  fetchMe: () => Promise<void>;
  logout: () => void;
};

const tokenStorageKey = 'yt_game_token';

const loadToken = () => localStorage.getItem(tokenStorageKey);

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: loadToken(),
  isLoading: false,
  error: null,
  register: async (payload) => {
    set({ isLoading: true, error: null });

    try {
      const response = await registerRequest(payload);
      localStorage.setItem(tokenStorageKey, response.token);
      set({ user: response.user, token: response.token, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка регистрации';
      set({ error: message, isLoading: false });
      throw error;
    }
  },
  login: async (payload) => {
    set({ isLoading: true, error: null });

    try {
      const response = await loginRequest(payload);
      localStorage.setItem(tokenStorageKey, response.token);
      set({ user: response.user, token: response.token, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка входа';
      set({ error: message, isLoading: false });
      throw error;
    }
  },
  fetchMe: async () => {
    const token = get().token;

    if (!token) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await meRequest(token);
      set({ user: response.user, isLoading: false });
    } catch (error) {
      localStorage.removeItem(tokenStorageKey);
      set({ user: null, token: null, isLoading: false, error: 'Сессия завершена. Войдите снова.' });
    }
  },
  logout: () => {
    localStorage.removeItem(tokenStorageKey);
    set({ user: null, token: null, error: null });
  }
}));
