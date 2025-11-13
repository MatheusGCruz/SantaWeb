// authCache.js

const TOKEN_KEY = "google_token";

// pega o token do cache
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// salva o token no cache
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// limpa o token
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
