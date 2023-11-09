import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../service/api';
import {
  pegarDetalheEndereco,
  pegarLatLongPeloCEP,
} from '../service/viaCep';
import {
  formataCEP,
  formataCpf,
  formataDataNascimento,
  formataTelefone,
} from '../utils/validacoes';

export const UsuarioContext = createContext();

const formDadosIniciais = {
  cpf: '',
  dataNascimento: '',
  nomeCompleto: '',
  email: '',
  telefone: '',
  tipoUsuario: 'Comprador',
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

export const UsuarioProvider = ({ children }) => {
  const [formData, setFormData] = useState(formDadosIniciais);

  console.log(formData)
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
      const response = await api.post('/usuario/cadastrar', formDataemMascaras);
      if (response.status === 201) {
        toast.success('Usuário cadastrado com sucesso!');
        setFormData(formDadosIniciais);
        navigate('/');
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
    <UsuarioContext.Provider
      value={{ handleChange, handleCepBlur, handleSubmit }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

UsuarioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
