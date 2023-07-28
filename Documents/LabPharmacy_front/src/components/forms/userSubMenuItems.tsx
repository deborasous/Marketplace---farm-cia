import { SubMenuItem } from '../../components/subMenu';
import { BiArrowBack } from 'react-icons/bi';

const generateUserSubMenuItems = (
  id: string | string[] | undefined
): SubMenuItem[] => {
  const userId = id && typeof id === 'string' ? id : '0'; // Se id for undefined ou não for uma string, usa '0' como valor padrão
  return [
    {
      name: '',
      path: '/',
      icon: BiArrowBack,
    },
    {
      name: 'Cadastrar',
      path: '/usuarios',
    },
    {
      name: 'Alterar',
      path: `/usuarios/${userId}`,
    },
    {
      name: 'Status',
      path: `/usuarios/${userId}/status`,
    },
    {
      name: 'Listar',
      path: '/usuarios/listar',
    },
    {
      name: 'Senha',
      path: '/usuarios/senha',
    },
  ];
};

export default generateUserSubMenuItems;
