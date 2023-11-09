import { useContext } from 'react';
import { Input } from '../../atoms/input/Input';
import { ButtonCall } from '../../atoms/button/ButtonCall';
import { AuthContext } from '../../../contexts/auth';

export const Form = ({
  fields,
  buttonText,
  className,
  showButton = true,
  onSubmit,
}) => {
  const { formData, updateFormData, handleCepBlur } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {fields.map((field, index) => (
        <Input
          key={index}
          label={field.label}
          name={field.name}
          type={field.type || 'text'}
          placeholder={field.placeholder || ''}
          value={formData[field.name]}
          onChange={(e) => updateFormData(field.name, e.target.value)}
          onBlur={field.name === 'cep' ? handleCepBlur : null}
          mask={field.mask}
        />
      ))}
      {showButton && buttonText && (
        <ButtonCall text={buttonText} className="mt-4" />
      )}
    </form>
  );
};

{
  /* <form onSubmit={handleSubmit} className="mx-auto w-full">
        <div>
          <h3 className="text-lg font-semibold text-slate-500 mb-4">
            Dados do Usuário
          </h3>
          <div className="usuario-section grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
            {fieldsPersonalData.slice(0, 7).map((field) => (
              <div key={field.name} className="grid">
                <label className="text-slate-600 mb-2">{field.label}</label>
                {field.name === 'senha' ? (
                  <div className="password-input relative ">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name={field.name}
                      value={formData[field.name]}
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
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onBlur={field.name === 'cep' ? handleCepBlur : null}
                    className="py-2 px-3 rounded border flex w-full"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-500 mt-10 mb-4">
            Dados de Endereço
          </h3>
          <div className="endereco-section grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
            {fieldAddress.slice(7).map((field) => (
              <div key={field.name} className="grid">
                <label className="text-slate-600 mb-2">{field.label}</label>
                <div className="password-input">
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onBlur={field.name === 'cep' ? handleCepBlur : null}
                    className="py-2 px-3 rounded border flex w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="text-green-800 font-bold mt-10 bg-[#25D296] py-[9px] px-20 rounded w-full lg:w-auto"
        >
          CADASTRAR
        </button>
      </form> */
}
