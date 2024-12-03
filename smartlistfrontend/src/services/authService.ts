// src/services/authService.ts
const API_BASE_URL = 'http://192.168.1.103:8000/api/';

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Erro ao fazer login.');
  }

  const data = await response.json();
  return data.access; // Token JWT
};

export const register = async (username: string, password: string) => {
  console.log('Registrando... servic');
  const response = await fetch(`${API_BASE_URL}register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Erro ao registrar.');
  }

  return await response.json();
};
