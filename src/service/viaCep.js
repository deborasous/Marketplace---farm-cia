import axios from 'axios';

const apiKey = '30b535e5b0bf433cbb7586c23d4b676a';

const eCepValido = (cep) => {
  return /^\d{8}$/.test(cep); 
};

export const pegarDetalheEndereco = async (cep) => {
  if (!eCepValido(cep)) {
    toast.error('CEP inválido. O CEP deve conter 8 digitos.');
    return;
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do endereço:', error);
  }
};


export const pegarLatLongPeloCEP = async (cep) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${cep}&key=${apiKey}&limit=1`
    );

    if (response.data.results.length > 0) {
      const result = response.data.results[0];
      const lat = result.geometry.lat;
      const long = result.geometry.lng;

      return { lat, long };
    } else {
      return null; 
    }
  } catch (error) {
    console.error('Erro ao buscar a latitude e a longitude:', error);
    return null;
  }
};
