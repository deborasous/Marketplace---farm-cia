import { api } from '../../service/api';
import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const ListaCompras = () => {
  const [compras, setCompras] = useState([]);
  const [comprasAgrupadas, setComprasAgrupadas] = useState({});
  const [compraSelecionada, setCompraSelecionada] = useState(null);
  const [abrirModal, setAbrirModal] = useState(false);

  useEffect(() => {
    const fetCompras = async () => {
      try {
        const response = await api.get('/vendas/lista');
        setCompras(response.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetCompras();
  }, []);

  useEffect(() => {
    const agrupado = {};

    compras.forEach((compra) => {
      const dataCompra = new Date(compra.createdAt);
      const dia = String(dataCompra.getDate()).padStart(2, '0');
      const mes = String(dataCompra.getMonth() + 1).padStart(2, '0');
      const dataKey = `${dia}/${mes}/${dataCompra.getFullYear()}`;

      if (!agrupado[dataKey]) {
        agrupado[dataKey] = [compra];
      } else {
        agrupado[dataKey].push(compra);
      }
    });
    setComprasAgrupadas(agrupado);
  }, [compras]);

  const calcularTotalCartao = (comprasGrupo) => {
    return comprasGrupo.reduce((total, compra) => {
      const totalCompra = parseFloat(compra.total.replace(',', '.'));
      return total + totalCompra;
    }, 0);
  };

  const handleClickCartao = (compra) => {
    setCompraSelecionada(compra);
    setAbrirModal(true);
  };

  const handleFecharModal = async () => {
    setAbrirModal(false);
  };

  return (
    <section className="compras h-screen pt-10 px-3 lg:pt-20 lg:px-20">
      <div className="results mb-12">
        <h1 className="text-slate-700 text-2xl md:text-3xl font-semibold ">
          Compras Realizadas
        </h1>
      </div>
      <div className="grid pb-5 md:flex md:flex-row gap-8">
        <div className="grid grid-cols-2 gap-2 w-full mx-auto  md:grid md:grid-cols-1 md:gap-4 px-1 md:max-h-24 md:w-1/4">
          {Object.keys(comprasAgrupadas).map((dataKey) => (
            <div
              key={dataKey}
              className="cards bg-white  shadow-md rounded-lg p-3 lg:p-10 border hover:cursor-pointer hover:scale-105 transition"
              onClick={() => handleClickCartao(comprasAgrupadas[dataKey])}
            >
              <p className="grid mb-3">
                <span className="font-semibold whitespace-nowrap">
                  Data da Compra:
                </span>
                {dataKey}
              </p>
              <p className="grid">
                <span className="font-semibold">Total:</span>R${' '}
                {calcularTotalCartao(comprasAgrupadas[dataKey]).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="detalhes-compra min-h-[500px] bg-[#ebebeb] py-6 px-6 rounded text-slate-600 md:w-3/4 md:px-10 md:py-10 hidden md:block">
          {compraSelecionada && (
            <DetalhesCompra
              compra={compraSelecionada}
              calcularTotalCartao={calcularTotalCartao}
            />
          )}
        </div>
      </div>

      {abrirModal && (
        <div className="">
          <div className="overflow-y-auto bg-white p-4 rounded-md fixed top-0 left-0 z-50 w-full h-full flex justify-center md:hidden">
            <div className="w-full">
              {compraSelecionada && (
                <DetalhesCompra
                  compra={compraSelecionada}
                  calcularTotalCartao={calcularTotalCartao}
                />
              )}
              <div className="pb-10 flex">
                <button
                  onClick={handleFecharModal}
                  className="bg-red-300 hover:bg-red-400 py-[9px] px-14 rounded text-red-800 font-semibold mx-auto"
                >
                  FECHAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const DetalhesCompra = ({ compra, calcularTotalCartao }) => {
  const total = calcularTotalCartao(compra);
  return (
    <div className="px-6 pb-4">
      <h3 className="text-lg font-semibold text-slate-700 mb-3">
        Detalhes da Compra
      </h3>

      <div>
        {compra.map((item) => (
          <div key={item.id}>
            <div className="border-t-2 border-slate-300 mb-3"></div>
            <div className="mb-4 grid grid-cols-1  md:flex md:justify-between md:items-center ">
              <div>
                <p>
                  <span className="font-semibold mr-3">ID:</span>
                  {item.id}
                </p>
                <p>
                  <span className="font-semibold mr-3">Produto:</span>
                  {item.produto.nomeProduto}
                </p>
                <p>
                  <span className="font-semibold mr-3">Preço Unitário:</span>
                  {item.precoUnitario}
                </p>
                <p>
                  <span className="font-semibold mr-3">Quantidade:</span>
                  {item.quantidadeProdutoVendido}
                </p>
                <p>
                  <span className="font-semibold mr-3">Dosagem:</span>
                  {item.produto.dosagem}
                </p>
                <p>
                  <span className="font-semibold mr-3">Descrição:</span>
                  {item.produto.descricao}
                </p>
                <p>
                  <span className="font-semibold mr-3">Laboratório:</span>
                  {item.produto.nomeLab}
                </p>
                <p>
                  <span className="font-semibold mr-3">
                    Forma de Pagamento:
                  </span>
                  {item.tipoPagamento}
                </p>
              </div>

              <div>
                <img
                  className="w-44 m-auto mt-3"
                  src={item.produto.imagemProduto}
                  alt={item.produto.nomeProduto}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-slate-800 text-lg font-semibold mr-3">
        <span>Total Pago: R$ </span>
        {total.toFixed(2)}
      </p>
    </div>
  );
};
