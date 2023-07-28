import { ChangeEvent } from 'react';

interface InputIdProps {
  value: number | null; // Altere para receber um número em vez de string
  onChange: (value: number) => void; // Altere o tipo para número
}

const InputId: React.FC<InputIdProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10);
    onChange(inputValue);
  };

  return (
    <div>
      <label>ID do Usuário:</label>
      <input type="number" value={value || 0} onChange={handleChange} />
    </div>
  );
};

export default InputId;
