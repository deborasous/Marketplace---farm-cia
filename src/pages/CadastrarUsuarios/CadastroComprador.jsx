import { Form } from '../../components/molecules/form/Form';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export const CadastroComprador = () => {
  const { handleCepBlur, formatField, handleCadastrar } =
    useContext(AuthContext);

  const handleFormatedChange = (e, formData, setFormData) => {
    const { name, value } = e.target;
    const formattedValue = formatField(name, value);
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleSubmit = (formData) => {
    console.log(formData, 'ffff');
    handleCadastrar(formData).then((response) => {
      if (response.status === 200) {
        // Limpe o formulário
        const emptyFormData = {};
        fieldsAddress.forEach((field) => {
          emptyFormData[field.name] = '';
        });
        setFormData(emptyFormData);
      }
    });
  };

  const fieldsPersonalData = [
    {
      name: 'cpf',
      label: 'CPF *',
      type: 'text',
      mask: '999.999.999-99',
      placeholder: '123.456.789-09',
    },
    { name: 'nomeCompleto', label: 'Nome Completo *', type: 'text' },
    {
      name: 'dataNascimento',
      label: 'Data de Nascimento *',
      type: 'text',
      mask: '99/99/9999',
    },
    {
      name: 'telefone',
      label: 'Telefone *',
      type: 'text',
      mask: '(99) 99999-9999', // Especifica a máscara para o telefone
      placeholder: '(12) 34567-8901',
    },
    { name: 'email', label: 'Email *', type: 'text' },
    { name: 'senha', label: 'Senha *', type: 'password' },
  ];

  const fieldsAddress = [
    { name: 'cep', label: 'CEP *', type: 'text', mask: '99999-999' },
    { name: 'estado', label: 'Estado *', type: 'text' },
    { name: 'cidade', label: 'Cidade *', type: 'text' },
    { name: 'bairro', label: 'Bairro *', type: 'text' },
    { name: 'logradouro', label: 'Logradouro *', type: 'text' },
    { name: 'numero', label: 'Número *', type: 'text' },
    { name: 'complemento', label: 'Complemento', type: 'text' },
    { name: 'lat', label: 'Latitude', type: 'text' },
    { name: 'long', label: 'Longitude', type: 'text' },
  ];

  return (
    <section className="px-8 py-10 w-full md:p-16">
      <div className="mx-auto w-full">
        <div>
          <h3 className="text-lg font-semibold text-slate-500 mb-4">
            Dados do Usuário
          </h3>
          <div className="usuario-section">
            <div className="password-input ">
              <Form
                fields={fieldsPersonalData}
                className="grid gap-4 grid-cols-1 md:grid-cols-2  lg:grid-cols-3"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-500 mt-10 mb-4">
            Dados de Endereço
          </h3>
          <div className="endereco-section">
            <Form
              fields={fieldsAddress}
              onChange={handleFormatedChange}
              showButton={true}
              onSubmit={handleSubmit}
              onCepBlur={handleCepBlur}
              className="grid gap-4 grid-cols-1 md:grid-cols-2  lg:grid-cols-3"
              buttonText="CADASTRAR"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
