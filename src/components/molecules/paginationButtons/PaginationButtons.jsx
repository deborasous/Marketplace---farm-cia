import React from 'react';
import { ButtonGosth } from '../../atoms/buttonGosth/ButtonGosth';
import { useContext } from 'react';
import { ReportContext } from '../../../contexts/ReportProvider';

const PaginationButtons = () => {
  const {
    paginaAtual,
    itensPorPagina,
    quantidadeTotalProdutos,
    setPaginaAtual,
  } = useContext(ReportContext);

  console.log(quantidadeTotalProdutos, 'itensPorPagina');

  return (
    <div className="flex items-center gap-5 mx-auto">
      <ButtonGosth
        text="Anterior"
        onClick={() => setPaginaAtual(paginaAtual - 1)}
        disabled={paginaAtual <= 1}
      />
      <span>{paginaAtual}</span>
      <ButtonGosth
        text="Próximo"
        onClick={() => setPaginaAtual(paginaAtual + 1)}
        disabled={
          paginaAtual * itensPorPagina >= quantidadeTotalProdutos ||
          quantidadeTotalProdutos <= itensPorPagina * paginaAtual
        }
      />
    </div>
  );
};

export default PaginationButtons;
