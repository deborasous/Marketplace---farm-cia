import React from 'react';
import { CadastroUsuario } from '../../components/CadastroUsuarios/CadastroUsuario';
import { ListaUsuarios } from '../../components/ListaUsuario/ListaUsuario';

export const CadastroUsuarios = () => {
  return (
    <div className="">
      <CadastroUsuario />
      <ListaUsuarios />
    </div>
  );
};
