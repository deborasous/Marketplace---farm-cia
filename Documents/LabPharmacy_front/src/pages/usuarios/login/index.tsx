import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../../service/api';
import jwt_decode from 'jwt-decode';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //fazer requisição ao back
      const response = await api.post('/api/usuarios/login', {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.token;

      localStorage.setItem('token', token);
      const decodedToken: any = jwt_decode(token);
      console.log(decodedToken, 'decoded');

      console.log(token, 'token');
      console.log(api, '111');
      router.push('/usuarios');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};
export default LoginPage;
