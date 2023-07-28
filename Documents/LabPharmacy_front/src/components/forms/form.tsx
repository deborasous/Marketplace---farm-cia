import React, { useRef, useEffect, useState } from 'react';

export interface FormField {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

// Define the form props interface
export interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formFields: FormField[]; // Array of individual form field objects
  submitButtonText: string;
  onChange: (name: string, value: string) => void;
  // showInputId: boolean;
  initialValues?: Partial<User>;
  isSubmitting: boolean;
}

export interface User extends UserStatus {
  id?: number;
  name: string;
  surname: string;
  gender?: string;
  cellPhone?: string;
}

export interface UserStatus {
  status: string;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  formFields,
  submitButtonText,
  onChange,
  initialValues,
  isSubmitting,
}) => {
  const [values, setValues] = useState<{ [key: string]: string }>(() =>
    convertUserToInitialValues(initialValues)
  );

  useEffect(() => {
    setValues(convertUserToInitialValues(initialValues));
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    onChange(name, value);
  };

  return (
    <form onSubmit={onSubmit}>
      {formFields.map((field) => {
        if (field.type === 'select') {
          return (
            <div key={field.name}>
              <label>{field.label}</label>
              <select
                name={field.name}
                onChange={handleChange}
                required={field.required}
                value={values[field.name] || ''}
                disabled={isSubmitting}
              >
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        } else if (field.type === 'text') {
          return (
            <div key={field.name}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                onChange={handleChange}
                required={field.required}
                value={values[field.name] || ''}
                disabled={isSubmitting}
              />
            </div>
          );
        } else {
          return null; // Ignore other field types
        }
      })}
      <button type="submit">{submitButtonText}</button>
    </form>
  );
};

export default Form;

// Função para converter o objeto User em um objeto com índice de tipo string
const convertUserToInitialValues = (
  user: Partial<User> | null | undefined
): { [key: string]: string } => {
  if (user === null || user === undefined) {
    return {
      name: '',
      surname: '',
      gender: '',
      cellPhone: '',
      status: '',
    };
  }

  return {
    name: user.name || '',
    surname: user.surname || '',
    gender: user.gender || '',
    cellPhone: user.cellPhone || '',
    status: user.status || '',
  };
};
