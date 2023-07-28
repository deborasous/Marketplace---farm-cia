import { config } from 'dotenv';
import axios from 'axios';
config();

const api = axios.create({
  baseURL: 'http://localhost:3005',
});

// Função para obter o token de autenticação do localStorage ou de algum outro local
const getToken = () => {
  return localStorage.getItem('token');
};

//FUNÇÃO PARA OBTERO TOKEN CSRF DE UM COOKIE
const getCSRFToken = () => {
  const name = 'csrfToken';
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
};

// Intercepta todas as requisições e adiciona o cabeçalho de autenticação
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  return config;
});

export { api };
