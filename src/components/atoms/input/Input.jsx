import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import InputMask from 'react-input-mask';

export const Input = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  type = 'text',
  mask = '',
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // const handleChange = (e) => {
  //   if (onChange) {
  //     onChange(e);
  //   }
  // };

  // const handleBlur = (e) => {
  //   if (onBlur) {
  //     onBlur(e);
  //   }
  // };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      const event = { target: { name, value: inputValue } };
      onBlur(event);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  console.log(inputValue, 'inputValue');

  return (
    <div className="grid">
      <label htmlFor={name} className="text-gray-500 text-base">
        {label}
      </label>
      <div className="relative mt-1">
        {mask ? (
          <InputMask
            mask={mask}
            type={
              type === 'password' && !isPasswordVisible ? 'password' : 'text'
            }
            name={name}
            className="py-3 px-4 rounded outline-none border border-gray-600 bg-white w-full"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ) : (
          <input
            type={
              type === 'password' && !isPasswordVisible ? 'password' : 'text'
            }
            name={name}
            className="py-3 px-4 rounded outline-none border border-gray-600 bg-white w-full"
            placeholder={placeholder}
            value={value} // Adicione o valor aqui
            onChange={handleChange}
            onBlur={handleBlur} // Mantenha a propriedade onBlur
          />
        )}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
          >
            {isPasswordVisible ? (
              <AiOutlineEyeInvisible size={25} className="" />
            ) : (
              <AiOutlineEye size={25} className="" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
