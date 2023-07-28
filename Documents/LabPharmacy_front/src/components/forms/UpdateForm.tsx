import React, { useState } from 'react';
import { api } from '../../service/api';
import Form, { FormField, User } from './form';

interface UpdateFormProps {
  id: number | null;
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  formFields: FormField[];
}

// Função para converter o objeto User em um objeto com índice de tipo string
const convertUserToInitialValues = (user: User): { [key: string]: string } => {
  return {
    name: user.name,
    surname: user.surname,
    gender: user.gender || '', // Garante que gender seja uma string vazia se for undefined
    cellPhone: user.cellPhone || '',
    // Adicione outras propriedades do objeto User aqui, se necessário
  };
};

const UpdateForm: React.FC<UpdateFormProps> = ({
  id,
  userData,
  setUserData,
  formFields,
}) => {
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  console.log(userData, 'userData UpdateForm');

  const handleChange = (name: string, value: string) => {
    setUserData((prevData: User | null) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar se o formulário já está sendo submetido
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true); // Marcar o formulário como "enviando"

    if (userData === null) {
      // Se o userData for nulo, retorna um array vazio para o loop abaixo não ser executado
      return;
    }

    // verifica se algum campo está vazio
    for (const field of Object.values(userData)) {
      if (typeof field === 'string' && field.trim() === '') {
        setError('Todos os campos devem ser preenchidos');
        setShowMessage(true);
        return;
      }
    }

    try {
      const response = await api.patch(`/api/usuarios/${id}`, {
        ...userData,
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
        // Acesso à mensagem de erro
        setError(error.response.data.message);
        setShowMessage(true);
      } else {
        setError('Não foi possível cadastrar este usuário.');
        setShowMessage(true);
      }
    } finally {
      setIsSubmitting(false); // Marcar o formulário como "não enviando"
    }
  };

  return (
    <>
      {error && <div>{error}</div>}
      {successMessage && <div>{successMessage}</div>}
      <Form
        onSubmit={handleFormSubmit}
        formFields={formFields}
        submitButtonText="Alterar"
        onChange={handleChange}
        // showInputId={true}
        initialValues={userData ? convertUserToInitialValues(userData) : {}}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default UpdateForm;
