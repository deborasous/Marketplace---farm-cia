import React, { ChangeEvent } from 'react';

interface FormProps {
  onSubmit: (formData: any) => void;
  formFields: {
    label: string;
    name: string;
    type: string;
    required?: boolean;
    options?: { value: string; label: string }[];
  }[];
  submitButtonText: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Add handleChange to FormProps
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  formFields,
  submitButtonText,
  handleChange,
}) => {
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
