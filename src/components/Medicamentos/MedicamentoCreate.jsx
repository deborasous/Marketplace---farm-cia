import React, { useState } from 'react';
import { api } from '../../service/api';
import { toast } from 'react-toastify';

export const MedicamentoCreate = ({ atualizarMedicamentosLista }) => {
  const [nomeProduto, setNomeProduto] = useState('');
  const [nomeLab, setNomeLab] = useState('');
  const [imagemProduto, setImagemProduto] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [tipoProduto, setTipoProduto] = useState('Controlado');
  const [precoUnitario, setPrecoUnitario] = useState('');
  const [totalEstoque, setTotalEstoque] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cadastraMedicamento = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nomeProduto', nomeProduto);
    formData.append('nomeLab', nomeLab);
    formData.append('imagemProduto', imagemProduto);
    formData.append('dosagem', dosagem);
    formData.append('tipoProduto', tipoProduto);
    formData.append('precoUnitario', precoUnitario);
    formData.append('totalEstoque', totalEstoque);
    formData.append('descricao', descricao);

    let formDataObject = Object.fromEntries(formData.entries());

    let formDataJsonString = JSON.stringify(formDataObject);

    try {
      const response = await api.post('/produtos/admin/', formDataObject);

      if (response.ok) {
        setSubmitted(true);
      }
      setNomeProduto('');
      setNomeLab('');
      setImagemProduto('');
      setDosagem('');
      setTipoProduto('Controlado');
      setPrecoUnitario('');
      setTotalEstoque(0);
      setDescricao('');
      toast.success('Produto cadastrado com sucesso!');

      atualizarMedicamentosLista(formDataJsonString);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center text-gray-500 text-sm pt-20 pb-20">
      <div className="bg-white shadow-lg rounded-md p-3 md:p-10 flex flex-col w-11/12 max-w-lg">
        <div>
          {submitted ? (
            <p className="text-center">Medicamento cadastrado com sucesso!</p>
          ) : (
            <div>
              <h1 className="text-slate-700 text-3xl font-semibold text-center mb-10">
                Cadastrar Medicamento
              </h1>
              <form
                className="bg-white shadow-lg rounded-md p-3 md:p-10 flex flex-col w-10/11 max-w-lg group"
                onSubmit={cadastraMedicamento}
                noValidate
              >
                <label htmlFor="nomeProduto" className="mb-2">
                  <span>Nome do Medicamento</span>
                  <input
                    name="nomeProduto"
                    id="nomeProduto"
                    type="text"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    placeholder=" "
                    required
                    pattern=".{3,}"
                    value={nomeProduto}
                    onChange={(e) => setNomeProduto(e.target.value)}
                  />
                  <span className="mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    O Nome do Medicamento deve ter no mínimo 5 caracteres
                  </span>
                </label>

                <label htmlFor="nomeLab" className="mb-2">
                  <span>Nome do Laboratório</span>
                  <input
                    name="nomeLab"
                    id="nomeLab"
                    type="text"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    placeholder=" "
                    required
                    pattern=".{3,}"
                    value={nomeLab}
                    onChange={(e) => setNomeLab(e.target.value)}
                  />
                  <span className="mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer">
                    O Nome do Laboratório deve ter no mínimo 5 caracteres
                  </span>
                </label>

                <label htmlFor="imagemProduto" className="mb-2">
                  <span>Imagem</span>
                  <select
                    name="imagemProduto"
                    id="imagemProduto"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    value={imagemProduto}
                    onChange={(e) => setImagemProduto(e.target.value)}
                    required
                  >
                    <option >Selecione a imagem</option>
                    <option value="https://files.lojas.club/4PCPRGQNVS8711BN94CULI.png">Controlado</option>
                    <option value="https://files.lojas.club/4FKG4JB1L29N41BV0C0G4G.png">Não Controlado</option>
                  </select>
                </label>

                <label htmlFor="dosagem" className="mb-2">
                  <span>Dosagem</span>
                  <input
                    name="dosagem"
                    id="dosagem"
                    type="text"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    value={dosagem}
                    onChange={(e) => setDosagem(e.target.value)}
                    placeholder=" "
                    required
                    pattern=".{1,}"
                  />
                  <span className="mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    A dosagem é obrigatória
                  </span>
                </label>

                <label htmlFor="tipoProduto" className="mb-2">
                  <span>Tipo de Medicamento</span>
                  <select
                    name="tipoProduto"
                    id="tipoProduto"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800"
                    value={tipoProduto}
                    onChange={(e) => setTipoProduto(e.target.value)}
                  >
                    <option value="Controlado">Controlado</option>
                    <option value="Não Controlado">Não Controlado</option>
                  </select>
                </label>

                <label htmlFor="precoUnitario" className="mb-2">
                  <span>Preço</span>
                  <input
                    name="precoUnitario"
                    id="precoUnitario"
                    type="number"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    value={precoUnitario}
                    onChange={(e) => setPrecoUnitario(e.target.value)}
                    placeholder="R$ "
                    min={0.01}
                    step={0.01}
                    required
                    pattern="(0*[1-9]\d*(\.\d+)?|0+\.\d*[1-9]\d*)"
                  />
                  <span className="mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    O valor precisa ser positivo
                  </span>
                </label>

                <label htmlFor="estoque" className="mb-2">
                  <span>Estoque</span>
                  <input
                    name="estoque"
                    id="estoque"
                    type="number"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    value={totalEstoque}
                    onChange={(e) => setTotalEstoque(e.target.value)}
                    min={0}
                    required
                  />
                  <span className="mt-0 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    O estoque não poder ser menor que 0
                  </span>
                </label>

                <label htmlFor="descricao">
                  <span>Descrição</span>
                  <textarea
                    name="descricao"
                    id="descricao"
                    className="w-full rounded border border-gray-300 bg-inherit p-2.5 shadow shadow-gray-100 mt-0 appearance-none outline-none text-neutral-800"
                    rows="3"
                    cols="5"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 bg-blue-500 py-3 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50"
                >
                  Efetuar Cadastro
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
