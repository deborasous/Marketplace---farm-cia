import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../contexts/carrinhoCompras';
import { Cart } from '../Carrinho/Carrinho.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../service/api';

export const MedicamentosListaComprador = () => {
  const [mostraModal, setMostraModal] = useState(false);
  const [products, setMedicamentos] = useState([]);
  const { itensCarrinho, adicionarAoCarrinho, removerDoCarrinho } =
    useContext(CartContext);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(20);
  const [pesquisar, setPesquisar] = useState('');
  const [totalMedicamentos, setTotalMedicmentos] = useState(0);

  const toggle = () => {
    setMostraModal(!mostraModal);
  };

  useEffect(() => {
    const getMedicamentos = async () => {
      const offset = (paginaAtual - 1) * itensPorPagina;

      try {
        const response = await api.get(`produtos/${offset}/${itensPorPagina}`, {
          params: { nomeProduto: pesquisar },
        });

        if (Array.isArray(response.data.resultado)) {
          setMedicamentos(response.data.resultado);
          setTotalMedicmentos(response.data.contar);
        } else {
          console.log('Dados da Api não são um array', response.data);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getMedicamentos();
  }, [paginaAtual, itensPorPagina, pesquisar]);

  const notificacaoAdicionadoCarrinho = (item) =>
    toast.success(`${item.nomeProduto} adicionado ao carrinho!`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      style: {
        backgroundColor: 'rgb(32,193,148)',
        color: '#000',
      },
    });

  const notificacaoRemovidoCarrinho = (item) =>
    toast.error(`${item.nomeProduto} removido do carrinho!`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      style: {
        backgroundColor: 'rgb(32,193,148)',
        color: '#000',
      },
    });

  const handleremoverDoCarrinho = (product) => {
    removerDoCarrinho(product);
    notificacaoRemovidoCarrinho(product);
  };

  const handlePesquisar = (e) => {
    setPesquisar(e.target.value);
    setPaginaAtual(1);
  };

  return (
    <div className="flex flex-col justify-center bg-gray-100">
      <ToastContainer />
      <div className="flex justify-between items-center px-20">
        <h1 className="text-4xl uppercase font-bold mt-10 text-center mb-10">
          Produtos
        </h1>
        {!mostraModal && (
          <button
            className="px-4 py-2 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            style={{ backgroundColor: 'rgb(32,193,148)' }}
            onClick={toggle}
          >
            Carrinho de Compras ({itensCarrinho.length})
          </button>
        )}
      </div>
      <div className="flex justify-content-end items-center mr-20 mb-10">
        <label className="text-gray-700 text-sm font-bold">
          Producar pelo:
        </label>
        <input
          className="border-2 border-gray-300 bg-white h-10 pr-5 pl-5 rounded-lg text-lg-start focus:outline-none"
          type="text"
          placeholder="Nome do Medicamento"
          value={pesquisar}
          onChange={handlePesquisar}
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg px-10 py-10"
          >
            <img
              src={product.imagemProduto}
              alt={product.nomeProduto}
              className="rounded-md h-48"
            />
            <div className="mt-4">
              <h1 className="text-lg uppercase font-bold">
                {product.nomeProduto}
              </h1>
              <p className="mt-2 text-gray-600">R${product.precoUnitario}</p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              {!itensCarrinho.find((item) => item.id === product.id) ? (
                <button
                  className="px-4 py-2 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  style={{ backgroundColor: 'rgb(32,193,148)' }}
                  onClick={() => {
                    adicionarAoCarrinho(product);
                    notificacaoAdicionadoCarrinho(product);
                  }}
                >
                  Adicionar ao Carrinho
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    className="px-4 py-2 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    style={{ backgroundColor: 'rgb(32,193,148)' }}
                    onClick={() => {
                      const itemCarrinho = itensCarrinho.find(
                        (item) => item.id === product.id
                      );
                      if (itemCarrinho.quantidadeProdutoVendido === 1) {
                        handleremoverDoCarrinho(product);
                      } else {
                        removerDoCarrinho(product);
                      }
                    }}
                  >
                    -
                  </button>
                  <p className="text-gray-600">
                    {itensCarrinho.find((item) => item.id === product.id).quantidadeProdutoVendido}
                  </p>
                  <button
                    className="px-4 py-2 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    style={{ backgroundColor: 'rgb(32,193,148)' }}
                    onClick={() => {
                      adicionarAoCarrinho(product);
                    }}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-3 mb-2 pagination">
        <button
          className="mr-2 px-4 py-2 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700" style={{ backgroundColor: 'rgb(32,193,148)' }}
          onClick={() => setPaginaAtual(paginaAtual - 1)}
          disabled={paginaAtual <= 1} 
        >
          Anterior
        </button>
        <span>{paginaAtual}</span>
        <button
          className="ml-2 px-4 py-2 text-black text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700" style={{ backgroundColor: 'rgb(32,193,148)' }}
          onClick={() => setPaginaAtual(paginaAtual + 1)}
          disabled={paginaAtual >= totalMedicamentos}
        >
          Próximo
        </button>
      </div>
      <Cart mostraModal={mostraModal} toggle={toggle} />
    </div>
  );
};
