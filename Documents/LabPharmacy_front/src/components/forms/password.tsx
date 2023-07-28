import React, { useState } from 'react';
import { api } from '../../service/api';
import jwt_decode from 'jwt-decode';

interface UserFormData {
  name: string;
  surname: string;
  gender: string;
  dateBirth: string;
  cpf: string;
  cellPhone: string;
  email: string;
  password: string;
}

const PassswordForm: React.FC = () => {
  const [userRegister, setUserRegister] = useState<UserFormData>({
    name: '',
    surname: '',
    gender: '',
    dateBirth: '',
    cpf: '',
    cellPhone: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/usuarios', {
        name: userRegister.name,
        surname: userRegister.surname,
        gender: userRegister.gender,
        dateBirth: userRegister.dateBirth,
        cpf: userRegister.cpf,
        cellPhone: userRegister.cellPhone,
        email: userRegister.email,
        password: userRegister.password,
      });

      if (response.status === 201) {
        setSuccessMessage('Usuário cadastrado com sucesso.');
      }
    } catch (error) {
      setError('Não foi possível cadastrar este usuário.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={userRegister.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Sobrenome</label>
        <input
          type="text"
          name="name"
          value={userRegister.surname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div>
          <label>CPF</label>
          <input
            type="text"
            name="name"
            value={userRegister.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Data de Nascimento</label>
          <input
            type="text"
            name="name"
            value={userRegister.dateBirth}
            onChange={handleChange}
            required
          />
        </div>
        <label>Gênero</label>
        <input
          type="text"
          name="name"
          value={userRegister.gender}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Celular</label>
        <input
          type="text"
          name="name"
          value={userRegister.cellPhone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>E-mail</label>
        <input
          type="text"
          name="name"
          value={userRegister.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Senha</label>
        <input
          type="text"
          name="name"
          value={userRegister.password}
          onChange={handleChange}
          required
        />
      </div>

      {error && <div>{error}</div>}
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default PassswordForm;
