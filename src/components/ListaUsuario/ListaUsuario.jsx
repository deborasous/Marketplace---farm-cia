import React, { useState, useEffect } from 'react';
import { api } from '../../service/api';
import { toast } from 'react-toastify';
import { formataCpf, formataTelefone } from '../../utils/validacoes';

export const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(20);
  const [pesquisar, setPesquisar] = useState('');
  const [abrirModal, setAbrirModal] = useState(false);
  const [selecionaUsuarioId, setSelecionaUsuarioId] = useState('');
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [usuarioOriginal, setUsuarioOriginal] = useState({});
  const [usuarioEditado, setUsuarioEditado] = useState({
    nomeCompleto: '',
    email: '',
    cpf: '',
    telefone: '',
    tipoUsuario: '',
  });

  const removeMascaras = (usuario) => {
    return {
      ...usuario,
      cpf: usuario.cpf.replace(/\D/g, ''),
      telefone: usuario.telefone.replace(/\D/g, ''),
    };
  };

  const getInfoUsuario = async (usuarioId) => {
    setSelecionaUsuarioId(usuarioId);

    try {
      const response = await api.get(`/comprador/admin/${usuarioId}`);
      const infoUsuario = response.data;

      const usuarioComMascaras = {
        ...infoUsuario,
        cpf: formataCpf(infoUsuario.cpf),
        telefone: formataTelefone(infoUsuario.telefone),
      };

      setUsuarioOriginal(infoUsuario);
      setUsuarioEditado(usuarioComMascaras);
      setAbrirModal(true);
    } catch (error) {
      console.error('Erro ao carregar informações do usuário:', error);
    }
  };

  const fetchUsuarios = async () => {
    const offset = (paginaAtual - 1) * itensPorPagina;

    try {
      const response = await api.get(
        `/comprador/admin/${offset}/${itensPorPagina}`,
        { params: { nomeCompleto: pesquisar } }
      );

      if (Array.isArray(response.data.resultados)) {
        setUsuarios(response.data.resultados);
        setTotalUsuarios(response.data.contar);
      } else {
        console.log('Dados da Api deve ser um array', response.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, [paginaAtual, itensPorPagina, pesquisar]);

  const handleSalvarAlteracoes = async () => {
    const usuarioSemMascaras = removeMascaras(usuarioEditado);

    const dadosAlterados = {};
    for (const campo in usuarioSemMascaras) {
      if (usuarioSemMascaras[campo] !== usuarioOriginal[campo]) {
        dadosAlterados[campo] = usuarioSemMascaras[campo];
      }
    }

    try {
      const response = await api.patch(
        `/comprador/admin/${selecionaUsuarioId}`,
        dadosAlterados
      );

      if (response.status === 204) {
        toast.success('Alterações salvas com sucesso.');
        setAbrirModal(false);
      }

      fetchUsuarios();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleFecharModal = async () => {
    setAbrirModal(false);
    setUsuarioEditado({
      nomeCompleto: '',
      email: '',
      cpf: '',
      telefone: '',
      tipoUsuario: '',
    });
    setUsuarioOriginal({});
  };

  const handlePesquisar = (e) => {
    setPesquisar(e.target.value);
    setPaginaAtual(1);
  };

  return (
    <section className="lista-usuarios pb-20 px-20">
      <h3 className="text-xl font-semibold text-slate-500 mb-4">
        Usuários Cadastrados
      </h3>

      <input
        className="py-2 px-3 mb-4 border outline-1  focus:outline-[#25D296] rounded w-80"
        type="text"
        placeholder="Filtrar por Nome"
        value={pesquisar}
        onChange={handlePesquisar}
      />

      <table className="table-auto w-full">
        <thead>
          <tr className="border-2 border-slate-300 text-slate-500">
            <th className="py-2  font-medium text-lg pl-5">ID</th>
            <th className="py-2  font-medium text-lg">CPF</th>
            <th className="py-2  font-medium text-lg">Nome Completo</th>
            <th className="py-2  font-medium text-lg">Data Nascimento</th>
            <th className="py-2  font-medium text-lg">Email</th>
            <th className="py-2  font-medium text-lg">Telefone</th>
            <th className="py-2  font-medium text-lg">Tipo Usuário</th>
            <th className="py-2  font-medium text-lg">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="border border-slate-300">
              <td className="py-1 pl-5">{usuario.id}</td>
              <td className="py-2 pl-5">{usuario.cpf}</td>
              <td className="py-2 pl-5">{usuario.nomeCompleto}</td>
              <td className="py-2 pl-5">{usuario.dataNascimento}</td>
              <td className="py-2 pl-5">{usuario.email}</td>
              <td className="py-2 pl-5">{usuario.telefone}</td>
              <td className="py-2 pl-5">{usuario.tipoUsuario}</td>
              <td>
                <button
                  onClick={() => getInfoUsuario(usuario.id)}
                  className="text-green-800 font-semibold bg-[#25D296] hover:bg-[#12b97f] px-4 py-2 rounded"
                >
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
          disabled={paginaAtual * itensPorPagina >= totalUsuarios}
        >
          Próximo
        </button>
      </div>

      {abrirModal && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-md shadow w-7/12">
            <h3 className="text-lg font-semibold text-slate-500 mb-4">
              Editar Usuário
            </h3>
            <div>
              <label htmlFor="email" className="text-slate-600 mb-2 mt-3">
                Email:
              </label>
              <input
                className="py-2 px-3 rounded border flex w-full"
                type="text"
                id="email"
                placeholder="Email"
                value={usuarioEditado.email}
                onChange={(e) =>
                  setUsuarioEditado({
                    ...usuarioEditado,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="cpf" className="text-slate-600 mb-2 mt-3">
                CPF:
              </label>
              <input
                className="py-2 px-3 rounded border flex w-full"
                type="text"
                id="cpf"
                placeholder="CPF"
                value={usuarioEditado.cpf}
                onChange={(e) =>
                  setUsuarioEditado({
                    ...usuarioEditado,
                    cpf: formataCpf(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="telefone" className="text-slate-600 mb-2 mt-3">
                Telefone:
              </label>
              <input
                className="py-2 px-3 rounded border flex w-full"
                type="text"
                id="telefone"
                placeholder="Telefone"
                value={usuarioEditado.telefone}
                onChange={(e) =>
                  setUsuarioEditado({
                    ...usuarioEditado,
                    telefone: formataTelefone(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="tipoUsuario" className="text-slate-600 mb-2 mt-3">
                Tipo de Usuário:
              </label>
              <select
                className="py-2 px-3 rounded border flex w-full"
                id="tipoUsuario"
                value={usuarioEditado.tipoUsuario}
                onChange={(e) =>
                  setUsuarioEditado({
                    ...usuarioEditado,
                    tipoUsuario: e.target.value,
                  })
                }
              >
                <option value="Administrador">Administrador</option>
                <option value="Comprador">Comprador</option>
              </select>
            </div>
            <div className="flex gap-5 mt-5">
              <button
                onClick={handleSalvarAlteracoes}
                className="text-green-800 font-semibold bg-[#25D296] hover:bg-[#12b97f] py-[12px] px-14 rounded"
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
