import React, { useEffect, useState } from 'react';
import { api } from '../../service/api';
import Form from './form';
import { getUserIdFromLocalStorage } from '../../utils/localStorage';

interface User {
  id: number;
  name: string;
  surname: string;
  gender: string;
  cellPhone: string;
}

const UpdateForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    surname: '',
    gender: '',
    cellPhone: '',
  });
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserIdFromLocalStorage();
        const response = await api.get(`/api/usuarios/${userId}`);
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        setError('Não foi possível obter os dados do usuário.');
        setShowMessage(true);
      }
    };
    fetchData();
  }, []);

  const formFields = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Surname', name: 'surname', type: 'text', required: true },
    {
      label: 'Gênero',
      name: 'gender',
      type: 'select',
      required: true,
      options: [
        { value: 'male', label: 'Masculino' },
        { value: 'female', label: 'Feminino' },
        { value: 'other', label: 'Outros' },
      ],
    },
    { label: 'Celular', name: 'cellPhone', type: 'text', required: true },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // verifica se algum campo está vazio
    for (const field of Object.values(user)) {
      if (field.trim() === '') {
        setError('Todos os campos devem ser preenchidos');
        setShowMessage(true);
        return;
      }
    }

    try {
      const response = await api.post('/api/usuarios/${id}', {
        ...user,
      });

      if (response.status === 204) {
        setSuccessMessage('Usuário atualizado com sucesso!');
        setError('');
        setShowMessage(true);
      }

      if (response.status === 409) {
        setSuccessMessage('CPF já está cadastrado.');
        setError('');
        setShowMessage(true);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setSuccessMessage(''); // Limpa a mensagem de sucesso, caso haja alguma
        setError(error.response.data.message); // Define a mensagem de erro recebida do backend
        setShowMessage(true);
      } else {
        setError('Não foi possível cadastrar este usuário.');
        setShowMessage(true);
      }
    }
  };

  //limpar msg após determinado tempo
  const clearMessages = () => {
    setShowMessage(false);
    setError('');
    setSuccessMessage('');
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(clearMessages, 5000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <>
      {error && <div>{error}</div>}
      {successMessage && <div>{successMessage}</div>}
      <Form
        onSubmit={handleSubmit}
        formFields={formFields}
        submitButtonText="Alterar"
        handleChange={handleChange}
      />
    </>
  );
};

export default UpdateForm;
