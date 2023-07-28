import PrivateRoute from '@/routes/privateRoute';
import SubMenu, { SubMenuItem } from '../../components/subMenu';
import { BiArrowBack } from 'react-icons/bi';
import { useState } from 'react';
import { useRouter } from 'next/router';

const DepositPage: React.FC = () => {
  const [activePath, setActivePath] = useState('/deposito');
  const router = useRouter();

  const handleMenuItemClick = (path: string) => {
    setActivePath(path);
    router.push(path);
  };

  const userSubMenuItems: SubMenuItem[] = [
    {
      name: '',
      path: '/',
      icon: BiArrowBack,
    },
    {
      name: 'Listar',
      path: '/deposito/listar',
    },
    {
      name: 'Cadastrar',
      path: '/deposito/cadastrar',
    },
    {
      name: 'Excluir',
      path: '/deposito/excluir',
    },
    {
      name: 'Alterar',
      path: '/deposito/alterar',
    },
  ];

  return (
    <PrivateRoute redirectRoute="/usuarios/login">
      <div>
        <SubMenu
          subMenuItems={userSubMenuItems}
          activePath={activePath}
          onItemClick={handleMenuItemClick}
        />
        <h1>Deposito</h1>
        <p>Deposito.</p>
      </div>
    </PrivateRoute>
  );
};

export default DepositPage;
