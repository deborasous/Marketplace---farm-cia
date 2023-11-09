import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { api } from '../service/api';
import { pegarDetalheEndereco, pegarLatLongPeloCEP } from '../service/viaCep';

export const AuthContext = createContext();

export const AuthProvider = ({ children, fields }) => {
  const navigate = useNavigate();
  const usuarioRecuperado = JSON.parse(localStorage.getItem('usuario')) || null;
  const expirarToken = localStorage.getItem('expirarToken') || null;
  const [user, setUser] = useState(usuarioRecuperado);
  const [loading, setLoading] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const initialState = {};
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    const usuarioRecuperado = localStorage.getItem('usuario');
    if (usuarioRecuperado) {
      const tempoExpirarToken = new Date(expirarToken);

      if (new Date() > tempoExpirarToken) {
        logout();
      } else {
        setUser(JSON.parse(usuarioRecuperado));
        setTipoUsuario(JSON.parse(usuarioRecuperado).tipoUsuario);
        setNomeCompleto(JSON.parse(usuarioRecuperado).nomeCompleto);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await api.post('/usuario/login', {
        email,
        senha,
      });

      console.log(response);
      if (response.status === 200) {
        const usuarioLogado = response.data;
        setTipoUsuario(usuarioLogado.tipoUsuario);
        setNomeCompleto(usuarioLogado.nomeCompleto);

        const tempoExpirarToken = new Date();
        tempoExpirarToken.setSeconds(tempoExpirarToken.getSeconds() + 86400);

        const token = response.data.token;
        localStorage.setItem('usuario', JSON.stringify(usuarioLogado));
        localStorage.setItem('token', token);
        localStorage.setItem('expirarToken', tempoExpirarToken.toISOString());

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(usuarioLogado);

        if (usuarioLogado.tipoUsuario === 'Administrador') {
          toast.success('Administrador logado sucesso!');
          navigate('/admin/dashboard');
        } else if (usuarioLogado.tipoUsuario === 'Comprador') {
          toast.success('Comprador logado com sucesso!');
          navigate('/comprador/medicamentos');
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
      navigate('/');
    }
  };

  const recoverPassword = async (email, novaSenha, confirmarSenha) => {
    if (novaSenha !== confirmarSenha) {
      toast.error('A nova senha e a confirmação de senha não coincidem.');
      return;
    }

    try {
      const response = await api.post('/usuario/nova-senha', {
        email,
        novaSenha,
        confirmarSenha,
      });

      if (response.status === 200) {
        toast.success('Senha atualizada com sucesso.');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data.message);
      navigate('/');
    }
  };

  const removerMascaras = (data) => {
    const dataSemMascara = { ...data };
    // Suponha que os campos com máscaras sejam "cpf", "cep", e "telefone", ajuste conforme necessário
    dataSemMascara.cpf = data.cpf.replace(/\D/g, ''); // Remove não dígitos
    dataSemMascara.cep = data.cep.replace(/\D/g, ''); // Remove não dígitos
    dataSemMascara.telefone = data.telefone.replace(/\D/g, ''); // Remove não dígitos
    // Adicione aqui outras máscaras, se necessário
    return dataSemMascara;
  };

  const handleCadastrar = async (formData) => {
    const formDataSemMascara = removerMascaras(formData);
    console.log(formDataSemMascara, 'GGGGG');

    try {
      formDataSemMascara.lat = formData.lat;
      formDataSemMascara.long = formData.long;
      
      const response = await api.post('/usuario/cadastrar', formDataSemMascara);
      if (response.status === 201) {
        toast.success('Usuário cadastrado com sucesso!');
        setFormData(formDataSemMascara);
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('expirarToken');

    axios.defaults.headers.common['Authorization'] = null;
    navigate('/');
  };

  // Função para atualizar o estado do formulário
  const updateFormData = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (fields.onChange) {
      fields.onChange(name, value);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        login,
        recoverPassword,
        logout,
        setTipoUsuario,
        setNomeCompleto,
        tipoUsuario,
        nomeCompleto,
        formData,
        updateFormData,
        handleChange,
        handleCepBlur,
        handleCadastrar,
        initialState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
