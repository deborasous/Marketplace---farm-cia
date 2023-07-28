import React, { useEffect, useState } from 'react';
import { api } from '../../service/api';
import Form from './form';
import { User } from './UpdateForm';

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

const UseRegisterForm: React.FC = () => {
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
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formFields = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Surname', name: 'surname', type: 'text', required: true },
    {
      label: 'Data de Nascimento',
      name: 'dateBirth',
      type: 'text',
      required: true,
    },
    {
      label: 'Gênero',
      name: 'gender',
      type: 'select', // Change the type to 'select'
      required: true,
      options: [
        // Provide options for gender selection
        { value: 'male', label: 'Masculino' },
        { value: 'female', label: 'Feminino' },
        { value: 'other', label: 'Outros' },
      ],
    },
    { label: 'CPF', name: 'cpf', type: 'text', required: true },
    { label: 'Celular', name: 'cellPhone', type: 'text', required: true },
    { label: 'E-mail', name: 'email', type: 'text', required: true },
    { label: 'Senha', name: 'password', type: 'text', required: true },
    // Add more fields as needed
  ];

  const handleChange = (name: string, value: string) => {
    setUserRegister((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Converte a data de nascimento para o formato "aaaa-mm-dd"
    const formattedDate = userRegister.dateBirth.split('/').reverse().join('-');

    //verificar senha
    const passwordPattern =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{8,12}$/;
    if (!passwordPattern.test(userRegister.password)) {
      setError(
        'Senha precisa incluir letras minúsculas, números e pelo menos um caractere especial'
      );
      setShowMessage(true);
      return; // Retorna para evitar a chamada à API caso a senha seja inválida
    }

    try {
      const response = await api.post('/api/usuarios', {
        ...userRegister,
        dateBirth: formattedDate,
      });

      if (response.status === 201) {
        setSuccessMessage('Usuário cadastrado com sucesso.');
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
        submitButtonText="Cadastrar"
        onChange={handleChange}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default UseRegisterForm;
