import React, { useState } from 'react';
import { api } from '../../service/api';
import Form, { FormField } from './form';

export interface UserStatus {
  id?: number;
  status: string;
}

interface StatusFormProps {
  id: number | null;
  userData: UserStatus | null;
  setUserData: React.Dispatch<React.SetStateAction<UserStatus | null>>;
  formFields: FormField[];
}

// Função para converter o objeto User em um objeto com índice de tipo string
const convertUserToInitialValues = (
  user: UserStatus
): { [key: string]: string } => {
  return {
    status: user.status,
  };
};

const StatusForm: React.FC<StatusFormProps> = ({
  id,
  userData,
  setUserData,
  formFields,
}) => {
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  console.log(userData, 'userData Status');


  const handleChange = (name: string, value: string) => {
    setUserData((prevData: UserStatus | null) => ({
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
        setError('Status inválido.');
        setShowMessage(true);
        return;
      }
    }

    try {
      const response = await api.patch(`/api/usuarios/${id}/status`, {
        status: userData?.status,
      });

      if (response.status === 200) {
        setSuccessMessage('Status de usuário atualizado com sucesso!');
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
        submitButtonText="Alterar Status"
        onChange={handleChange}
        // showInputId={true}
        initialValues={userData ? convertUserToInitialValues(userData) : {}}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default StatusForm;
