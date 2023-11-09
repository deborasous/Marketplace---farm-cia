// import "./login.css";
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Form } from '../../components/molecules/form/Form';

export const RecoverPassword = () => {
  const { recoverPassword } = useContext(AuthContext);

  const handleSubmit = (formData) => {
    recoverPassword(
      formData.email,
      formData.novaSenha,
      formData.confirmarSenha
    );
  };

  const fields = [
    {
      label: 'Email:',
      name: 'email',
      type: 'email',
      placeholder: 'Digite seu email',
    },
    {
      label: 'Nova senha:',
      name: 'novaSenha',
      type: 'password',
      placeholder: 'Digite sua senha',
    },
    {
      label: 'Confirmar senha:',
      name: 'confirmarSenha',
      type: 'password',
      placeholder: 'Digite sua senha',
    },
  ];

  return (
    <div id="login" className="px-8 py-10 w-full md:p-16">
      <h1 className="text-slate-700 text-3xl lg:text-4xl font-semibold mb-10 text-center">
        Recuperar senha
      </h1>
      <div className="p-10 bg-[#7ec5ab] max-w-[700px] max-h-[700px] rounded-md -rotate-1 mx-auto my-10">
        <div className="bg-[#adddcb] rounded-md p-10 rotate-1">
          <Form
            fields={fields}
            onSubmit={handleSubmit}
            buttonText="CADASTRAR"
            className="grid gap-4"
          />
        </div>
      </div>
    </div>
  );
};
