export const formataCEP = (cep) => {
  cep = cep.replace(/\D/g, '');
  cep = cep.replace(/(\d{5})(\d{1,3})/, '$1-$2');

  return cep;
};

export const formataDataNascimento = (data) => {
  if (typeof data !== 'string' || data.trim() === '') {
    return data; // Retorna o valor original se não for uma string válida ou se for uma string vazia
  }

  data = data.replace(/\D/g, '');
  data = data.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');

  return data;
};

export const formataTelefone = (telefone) => {
  const mascara = telefone.replace(/\D/g, '');
  const match = mascara.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

  if (match) {
    let numeroFormatado = '';

    if (match[1]) {
      numeroFormatado += `(${match[1]}`;
    }

    if (match[2]) {
      numeroFormatado += `) ${match[2]}`;
    }

    if (match[3]) {
      numeroFormatado += `-${match[3]}`;
    }

    return numeroFormatado;
  }

  return telefone;
};

export const formataCpf = (cpf) => {
  if (typeof cpf !== 'string' || !cpf) {
    return cpf; // Retorna o valor original se não for uma string válida
  }

  const cpfSemMascara = cpf.replace(/\D/g, '');
  if (cpfSemMascara.length !== 11) {
    return cpf; // Retorna o valor original se o CPF não tiver 11 dígitos
  }
  return `${cpfSemMascara.slice(0, 3)}.${cpfSemMascara.slice(
    3,
    6
  )}.${cpfSemMascara.slice(6, 9)}-${cpfSemMascara.slice(9)}`;
};
