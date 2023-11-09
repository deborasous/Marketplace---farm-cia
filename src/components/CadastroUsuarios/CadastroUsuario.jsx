import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { api } from '../../service/api';
import {
  pegarDetalheEndereco,
  pegarLatLongPeloCEP,
} from '../../service/viaCep';
import {
  formataCEP,
  formataCpf,
  formataDataNascimento,
  formataTelefone,
} from '../../utils/validacoes';

const formDadosIniciais = {
  cpf: '',
  dataNascimento: '',
  nomeCompleto: '',
  email: '',
  telefone: '',
  tipoUsuario: '',
  senha: '',
  cep: '',
  estado: '',
  cidade: '',
  bairro: '',
  logradouro: '',
  numero: '',
  complemento: '',
  lat: '',
  long: '',
};

const camposForm = [
  { name: 'cpf', label: 'CPF', type: 'text' },
  { name: 'nomeCompleto', label: 'Nome Completo', type: 'text' },
  { name: 'dataNascimento', label: 'Data de Nascimento', type: 'text' },
  { name: 'telefone', label: 'Telefone', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'senha', label: 'Senha', type: 'password' },
  { name: 'tipoUsuario', label: 'Tipo de Usuário', type: 'select' },
  { name: 'cep', label: 'CEP', type: 'text' },
  { name: 'estado', label: 'Estado', type: 'text' },
  { name: 'cidade', label: 'Cidade', type: 'text' },
  { name: 'bairro', label: 'Bairro', type: 'text' },
  { name: 'logradouro', label: 'Logradouro', type: 'text' },
  { name: 'numero', label: 'Número', type: 'text' },
  { name: 'complemento', label: 'Complemento', type: 'text' },
  { name: 'lat', label: 'Latitude', type: 'text' },
  { name: 'long', label: 'Longitude', type: 'text' },
];

export const CadastroUsuario = () => {
  const [formData, setFormData] = useState(formDadosIniciais);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cep') {
      setFormData({ ...formData, [name]: formataCEP(value) });
    } else if (name === 'dataNascimento') {
      const formattedDate = formataDataNascimento(value);
      setFormData({ ...formData, [name]: formattedDate });
    } else if (name === 'cpf') {
      const formattedDate = formataCpf(value);
      setFormData({ ...formData, [name]: formattedDate });
    } else if (name === 'telefone') {
      const numericValue = value.replace(/\D/g, '');

      const formattedDate = formataTelefone(numericValue);

      const telefoneInput = document.querySelector('input[name="telefone"]');
      if (telefoneInput) {
        telefoneInput.value = formattedDate;
      }
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCepBlur = async (e) => {
    const { value } = e.target;
    const soNumeroCEP = value.replace(/\D/g, '');

    if (soNumeroCEP.length === 8) {
      try {
        const enderecoData = await pegarDetalheEndereco(soNumeroCEP);
        const latLongData = await pegarLatLongPeloCEP(soNumeroCEP);

        if (enderecoData) {
          const juntarData = {
            ...formData,
            estado: enderecoData.uf,
            cidade: enderecoData.localidade,
            bairro: enderecoData.bairro,
            logradouro: enderecoData.logradouro,
          };

          if (latLongData) {
            juntarData.lat = latLongData.lat;
            juntarData.long = latLongData.long;
          }

          setFormData(juntarData);
        } else {
          toast.error('CEP não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do endereço:', error);
        toast.error('Erro ao buscar detalhes do endereço');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataemMascaras = {
      ...formData,
      cpf: formData.cpf.replace(/\D/g, ''),
      cep: formData.cep.replace(/\D/g, ''),
      telefone: formData.telefone.replace(/\D/g, ''),
    };

    try {
      const response = await api.post(
        '/usuario/admin/cadastro',
        formDataemMascaras
      );
      if (response.status === 201) {
        toast.success('Usuário cadastrado com sucesso!');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Erro ao cadastrar o usuário');
      }
    }
  };

  return (
    <section className=" flex py-20 px-20">
      <form onSubmit={handleSubmit} className="mx-auto w-full">
        <div className="flex justify-between mb-10">
          <h2 className="text-slate-700 text-3xl font-semibold ">
            Cadastrar Usuário
          </h2>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-500 mb-4">
            Dados do Usuário
          </h3>
          <div className="usuario-section grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
            {camposForm.slice(0, 7).map((campo) => (
              <div key={campo.name} className="grid">
                <label className="text-slate-600 mb-2">{campo.label}</label>
                {campo.name === 'senha' ? (
                  <div className="password-input relative ">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name={campo.name}
                      value={formData[campo.name]}
                      onChange={handleChange}
                      className="py-2 px-3 rounded border flex w-full"
                    />
                    <button
                      type="button"
                      onClick={handleTogglePassword}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 mr-2"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>
                ) : campo.name === 'tipoUsuario' ? (
                  <select
                    name={campo.name}
                    value={formData[campo.name]}
                    onChange={handleChange}
                    className="py-2 px-3 rounded border"
                  >
                    <option value="">Tipo de usuário</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Comprador">Comprador</option>
                  </select>
                ) : (
                  <input
                    type={campo.type}
                    name={campo.name}
                    value={formData[campo.name]}
                    onChange={handleChange}
                    onBlur={campo.name === 'cep' ? handleCepBlur : null}
                    className="py-[12px] px-3 rounded border flex w-full"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-500 mt-10 mb-4">
            Dados de Endereço
          </h3>
          <div className="endereco-section grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
            {camposForm.slice(7).map((campo) => (
              <div key={campo.name} className="grid">
                <label className="text-slate-600 mb-2">{campo.label}</label>
                <div className="password-input">
                  <input
                    type={campo.type}
                    name={campo.name}
                    value={formData[campo.name]}
                    onChange={handleChange}
                    onBlur={campo.name === 'cep' ? handleCepBlur : null}
                    className="py-[12px] px-3 rounded border flex w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="text-green-800 font-semibold mt-10 bg-[#25D296] hover:bg-[#12b97f]  py-[12px] px-20 rounded w-full lg:w-auto"
        >
          CADASTRAR
        </button>
      </form>
    </section>
  );
};
