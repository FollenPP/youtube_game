import { request } from '../../api/http';
import type { AuthResponse, SafeUser } from './auth.types';

export const registerRequest = async (payload: { email: string; username: string; password: string }) => {
  return request<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: payload
  });
};

export const loginRequest = async (payload: { email: string; password: string }) => {
  return request<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: payload
  });
};

export const meRequest = async (token: string) => {
  return request<{ user: SafeUser }>('/api/auth/me', {
    method: 'GET',
    token
  });
};
