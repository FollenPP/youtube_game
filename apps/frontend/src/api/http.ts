const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

type RequestOptions = {
  method?: 'GET' | 'POST';
  token?: string;
  body?: unknown;
};

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? 'Request failed');
  }

  return data as T;
}
