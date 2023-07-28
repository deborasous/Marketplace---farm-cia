import jwtDecode from 'jwt-decode';

interface DecodedToken {
  exp: number;
  userId: string;
  email: string;
  // Outras informações do token, se houver
}

export const validateToken = (token: string): boolean => {
  try {
    const decodedToken: DecodedToken = jwtDecode(token);

    if (
      !token ||
      decodedToken.exp < Date.now() / 1000 || // Verifica a expiração do token (em segundos)
      !decodedToken.userId ||
      !decodedToken.email
    ) {
      return false;
    }

    // Verificação bem-sucedida, o token é válido
    return true;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return false;
  }
};
