import React, { useEffect, useState } from 'react';
import { api } from '../../service/api';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export const ListarVendasAdmin = () => {
  const { user } = useContext(AuthContext);
  const [vendas, setVendas] = useState([]);
  const [totalGeral, setTotalGeral] = useState(0);

  const fetchListarVendasAdmin = async () => {
    try {
      const response = await api.get('/admin/vendas/lista');
      setVendas(response.data);

      const totalGeral = response.data.reduce(
        (total, venda) => total + parseFloat(venda.total),
        0
      );
      setTotalGeral(totalGeral.toFixed(2));
    } catch (error) {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchListarVendasAdmin();
  }, [user]);

  return (
    <div className="mx-auto w-full py-20 px-20">
      <div className="flex justify-between mb-10">
        <h2 className="text-slate-700 text-3xl font-semibold ">
          Lista de Vendas Realizadas
        </h2>
      </div>
      <div className="vendas-lista">
        {vendas && vendas.length > 0 ? (
          <div>
            <table className="table-auto w-full">
              <thead>
                <tr className="border-2 border-slate-300 text-slate-500 ">
                  <th className=" font-medium px-4">Produto</th>
                  <th className=" font-medium">Qtd de Itens Vendidos</th>
                  <th className=" font-medium">Preço Unitário</th>
                  <th className=" font-medium">Total das vendas por produto</th>
                  <th className=" font-medium">Imagem</th>
                </tr>
              </thead>
              <tbody className="">
                {vendas.map((venda) => (
                  <tr key={venda.id} className="border border-slate-300">
                    <td className="py-1  px-4"> {venda.produto.nomeProduto}</td>
                    <td className="py-1">{venda.quantidadeProdutoVendido}</td>
                    <td className="py-1">R$ {venda.precoUnitario}</td>
                    <td className="py-1">R$ {venda.total}</td>
                    <td className="py-1">
                      <img
                        className="object-cover w-[80px] h-[80px]"
                        src={venda.produto.imagemProduto}
                        alt={venda.produto.nomeProduto}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-lg text-slate-700">
              <strong>Total Geral: R$ {totalGeral}</strong>
            </div>
          </div>
        ) : (
          <p>Nenhum venda em estoque.</p>
        )}
      </div>
    </div>
  );
};
