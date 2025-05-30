
import { getAccessToken } from '@auth0/nextjs-auth0';

export async function apiClient<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAccessToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API Error: ${res.status} ${res.statusText} - ${errorBody}`);
  }

  return res.json();
}
