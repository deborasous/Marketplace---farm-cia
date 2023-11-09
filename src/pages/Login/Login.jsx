// import "./login.css";
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Form } from '../../components/molecules/form/Form';

export const Login = () => {
  const { login } = useContext(AuthContext);

  const handleSubmit = (formData) => {
    login(formData.email, formData.senha);
  };

  const fields = [
    {
      label: 'Email:',
      name: 'email',
      type: 'email',
      placeholder: 'Digite seu email',
    },
    {
      label: 'Senha:',
      name: 'senha',
      type: 'password',
      placeholder: 'Digite sua senha',
    },
  ];

  return (
    <div id="login" className="px-8 py-10 w-full md:p-16">
      <h1 className="text-slate-700 text-3xl lg:text-4xl font-semibold mb-10 text-center">
        Entrar
      </h1>
      <div className="p-10 bg-[#7ec5ab] max-w-[700px] max-h-[700px] rounded-md -rotate-1 mx-auto my-10">
        <div className="bg-[#ebecec] rounded-md p-10 rotate-1">
          <Form
            fields={fields}
            onSubmit={handleSubmit}
            buttonText="ENTRAR"
            className="grid gap-4"
          />
          <a
            href="/recuperar-senha"
            className="text-sm text-blue-700 mt-2 block text-right py-2"
          >
            Recuperar senha
          </a>
        </div>
      </div>
    </div>
  );
};
