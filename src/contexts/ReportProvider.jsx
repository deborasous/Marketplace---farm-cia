import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { api } from '../service/api';
import { AuthContext } from '../contexts/auth';

export const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [totalVendas, setTotalVendas] = useState(0);
  const [totalQuantidadeVendida, setTotalQuantidadeVendida] = useState(0);
  const [pesquisar] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(10);
  const [quantidadeTotalProdutos, setQuantidadeTotalProdutos] = useState();
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [hasProducts, setHasProducts] = useState(false);
  console.log(produtosFiltrados.length, 'config');

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      const dashboardResponse = await api.get(`/admin/dashboard`, config);
      setTotalVendas(dashboardResponse.data.totalVendas.toFixed(2) || '0.00');
      setTotalQuantidadeVendida(
        dashboardResponse.data.totalQuantidadeVendida || 0
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchProdutosEmEstoque = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      const offset = (paginaAtual - 1) * itensPorPagina;
      const produtosResponse = await api.get(
        `produtos/admin/${offset}/${itensPorPagina}`,
        config
      );

      const produtosFiltrados = produtosResponse.data.produtos.filter(
        (produto) => produto.usuarioId === user.id
      );
      const countProduct = produtosResponse.data.total;

      setProdutosFiltrados(produtosFiltrados);
      setQuantidadeTotalProdutos(countProduct);
      setHasProducts(produtosResponse.data.total > 0);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchProdutosEmEstoque();
  }, [paginaAtual, itensPorPagina, user]);

  return (
    <ReportContext.Provider
      value={{
        paginaAtual,
        itensPorPagina,
        totalVendas,
        totalQuantidadeVendida,
        quantidadeTotalProdutos,
        produtosFiltrados,
        setPaginaAtual,
        hasProducts,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
