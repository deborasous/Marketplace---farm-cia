import React, { useState, useEffect, useContext } from 'react';
import { api } from '../../service/api';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/auth';

export const MedicamentosListaAdmin = ({ medicamentosListaAtualizada }) => {
  const { user } = useContext(AuthContext);
  const [medicamentos, setMedicamentos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(30);
  const [pesquisar, setPesquisar] = useState('');
  const [abrirModal, setAbrirModal] = useState(false);
  const [selecionarMedicamentoId, setSelecionarMedicamentoId] = useState('');
  const [totalMedicamentos, setTotalMedicamentos] = useState(0);
  const [medicamentoOriginal, setMedicamentoOriginal] = useState({});
  const [medicamentosAtualizados, setMedicamentosAtualizados] = useState(false);
  const [medicamentoEditado, setMedicamentoEditado] = useState({
    id: '',
    nomeProduto: '',
    dosagem: '',
    tipoProduto: '',
    precoUnitario: '',
    descricao: '',
    totalEstoque: '',
  });
  console.log(medicamentoEditado, 'medicamentoEditado');

  const getInfoMedicamento = async (medicamentoId) => {
    setSelecionarMedicamentoId(medicamentoId);

    try {
      const response = await api.get(`/produto/${medicamentoId}`);
      const infoMedicamento = response.data;
      setMedicamentoOriginal(infoMedicamento);
      setMedicamentoEditado(infoMedicamento);

      setAbrirModal(true);
    } catch (error) {
      console.error('Erro ao carregar informações do medicamento:', error);
    }
  };

  useEffect(() => {
    const fetchMedicamentos = async () => {
      const offset = (paginaAtual - 1) * itensPorPagina;

      try {
        const response = await api.get(
          `/produtos/${offset}/${itensPorPagina}`,
          {
            params: { nomeProduto: pesquisar },
          }
        );

        const produtosFiltrados = response.data.resultado.filter(
          (produto) => produto.usuarioId === user.id
        );

        setMedicamentos(produtosFiltrados);
        setTotalMedicamentos(produtosFiltrados.length);
      } catch (error) {
        console.error('Erro ao buscar medicamentos:', error);
      }
    };

    if (medicamentosListaAtualizada || medicamentosAtualizados) {
      fetchMedicamentos();
      setMedicamentosAtualizados(false); // Redefina o estado
    }
    fetchMedicamentos();
  }, [
    paginaAtual,
    itensPorPagina,
    pesquisar,
    medicamentosListaAtualizada,
    medicamentosAtualizados,
  ]);

  const handleSalvarAlteracoes = async () => {
    const dadosAlterados = {};
    for (const campo in medicamentoEditado) {
      if (medicamentoEditado[campo] !== medicamentoOriginal[campo]) {
        dadosAlterados[campo] = medicamentoEditado[campo];
      }
    }

    try {
      const response = await api.patch(
        `/produto/admin/${selecionarMedicamentoId}`,
        dadosAlterados
      );

      if (response.status === 204) {
        toast.success('Alterações salvas com sucesso');
        setAbrirModal(false);
        setMedicamentosAtualizados(true); // Sinalize que os medicamentos foram atualizados
      }

      fetchMedicamentos();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleFecharModal = () => {
    setAbrirModal(false);
    setMedicamentoEditado({
      nomeProduto: '',
      dosagem: '',
      tipoProduto: '',
      precoUnitario: '',
      descricao: '',
      totalEstoque: '',
    });
    setMedicamentoOriginal({});
  };

  const handlePesquisar = (e) => {
    setPesquisar(e.target.value);
    setPaginaAtual(1);
  };

  return (
    <section className="lista-medicamentos py-20 px-20">
      <h2 className="text-slate-700 text-3xl font-semibold mb-10">
        Medicamentos Cadastrados
      </h2>

      <input
        className="py-2 px-3 mb-4 border rounded w-80"
        type="text"
        placeholder="Pesquisar Medicamento"
        value={pesquisar}
        onChange={handlePesquisar}
      />

      <table className="table-auto w-full">
        <thead>
          <tr className="border-2 border-slate-300 text-slate-500">
            <th>ID</th>
            <th>Nome Medicamento</th>
            <th>Dosagem</th>
            <th>Tipo de Medicamento</th>
            <th>Preço Unitário</th>
            <th>Descrição</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((medicamento) => (
            <tr key={medicamento.id} className="border border-slate-300">
              <td>{medicamento.id}</td>
              <td>{medicamento.nomeProduto}</td>
              <td>{medicamento.dosagem}</td>
              <td>{medicamento.tipoProduto}</td>
              <td>{medicamento.precoUnitario}</td>
              <td>{medicamento.descricao}</td>
              <td>{medicamento.totalEstoque}</td>
              <td>
                <button onClick={() => getInfoMedicamento(medicamento.id)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination flex justify-between mt-4 ">
        <button
          className="py-[9px] pl-10 pr-10 hover:border hover:border-green-500 rounded"
          onClick={() => setPaginaAtual(paginaAtual - 1)}
          disabled={paginaAtual <= 1}
        >
          Anterior
        </button>
        <span>{paginaAtual}</span>
        <button
          className="py-[9px] pr-10 pl-10 hover:border hover:border-green-500 rounded"
          onClick={() => setPaginaAtual(paginaAtual + 1)}
          disabled={paginaAtual * itensPorPagina >= totalMedicamentos}
        >
          Próximo
        </button>
      </div>

      {abrirModal && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-md shadow w-7/12">
            <h3 className="text-lg font-semibold text-slate-500 mb-4">
              Editar Medicamento
            </h3>
            <div>
              <label htmlFor="nomeProduto" className="text-slate-600 mb-2 mt-3">
                Nome do Medicamento:
              </label>
              <input
                className="py-2 px-3 rounded border flex w-full"
                type="text"
                id="nomeProduto"
                placeholder="Descrição"
                value={medicamentoEditado.nomeProduto}
                onChange={(e) =>
                  setMedicamentoEditado({
                    ...medicamentoEditado,
                    nomeProduto: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="dosagem" className="text-slate-600 mb-2 mt-3">
                Dosagem:
              </label>
              <input
                className="py-2 px-3 rounded border flex w-full"
                type="text"
                id="dosagem"
                placeholder="dosagem"
                value={medicamentoEditado.dosagem}
                onChange={(e) =>
                  setMedicamentoEditado({
                    ...medicamentoEditado,
                    dosagem: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="precoUnitario"
                className="text-slate-600 mb-2 mt-3"
              >
                Preço Unitario:
              </label>
              <input
                className="py-2 px-3 rounded border flex w-full"
                type="text"
                id="precoUnitario"
                placeholder="precoUnitario"
                value={medicamentoEditado.precoUnitario}
                onChange={(e) =>
                  setMedicamentoEditado({
                    ...medicamentoEditado,
                    precoUnitario: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="tipoProduto" className="text-slate-600 mb-2 mt-3">
                Tipo de Medicamento:
              </label>
              <input
                className="py-2 px-3 rounded border flex w-full"
                type="text"
                id="tipoProduto"
                placeholder="Tipo de Medicamento"
                value={medicamentoEditado.tipoProduto}
                onChange={(e) =>
                  setMedicamentoEditado({
                    ...medicamentoEditado,
                    tipoProduto: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="descricao" className="text-slate-600 mb-2 mt-3">
                Descrição:
              </label>
              <input
                className="py-2 px-3 rounded border flex w-full"
                type="text"
                id="descricao"
                placeholder="descricao"
                value={medicamentoEditado.descricao}
                onChange={(e) =>
                  setMedicamentoEditado({
                    ...medicamentoEditado,
                    descricao: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="totalEstoque"
                className="text-slate-600 mb-2 mt-3"
              >
                Estoque:
              </label>
              <input
                className="py-2 px-3 rounded border flex w-full"
                type="text"
                id="totalEstoque"
                placeholder="totalEstoque"
                value={medicamentoEditado.totalEstoque}
                onChange={(e) =>
                  setMedicamentoEditado({
                    ...medicamentoEditado,
                    totalEstoque: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-5 mt-5">
              <button
                onClick={handleSalvarAlteracoes}
                className="text-green-800 font-semibold bg-[#25D296] hover:bg-[#12b97f]  py-[9px] px-14 rounded"
              >
                SALVAR
              </button>
              <button
                onClick={handleFecharModal}
                className="bg-red-300 hover:bg-red-400 py-[9px] px-14 rounded text-red-800 font-semibold"
              >
                FECHAR
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
