import React from 'react';
import { ReportContext } from '../../../contexts/ReportProvider';
import { useContext } from 'react';
import { Table } from "../../atoms/table/table";

export const ProductInStock = () => {
  const {
    paginaAtual,
    itensPorPagina,
    totalVendas,
    totalQuantidadeVendida,
    quantidadeTotalProdutos,
    produtosFiltrados,
    setPaginaAtual,
  } = useContext(ReportContext);

  return (
    <div>
      {produtosFiltrados && produtosFiltrados.length > 0 ? (
        <Table
          theaders={[
            'ID',
            'Nome do Produto',
            'Preço Unitário',
            'Laboratório',
            'Qtd em Estoque',
          ]}
          data={produtosFiltrados.map((produto) => [
            produto.id,
            produto.nomeProduto,
            produto.precoUnitario,
            produto.nomeLab,
            produto.totalEstoque,
          ])}
        />
      ) : (
        <p>Nenhum produto em estoque.</p>
      )}
    </div>
  );
};
