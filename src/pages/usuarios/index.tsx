import { useRouter } from 'next/router';
import { useState } from 'react';

import PrivateRoute from '@/routes/privateRoute';
import SubMenu, { SubMenuItem } from '../../components/subMenu';
import { BiArrowBack } from 'react-icons/bi';
import ListForm from '../../components/forms/ListForm';
import UseRegisterForm from '../../components/forms/RegisterForm';
import DeleteForm from '../../components/forms/DeleteForm';
import UpdateForm from '../../components/forms/UpdateForm';

const UserPage: React.FC = () => {
  const [activePath, setActivePath] = useState('/usuarios');
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
      name: 'Cadastrar',
      path: '/usuarios',
    },
    {
      name: 'Alterar',
      path: '/usuarios/:id',
    },
    {
      name: 'Status',
      path: '/usuarios/status',
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

  const renderForm = () => {
    const { pathname } = router;

    switch (true) {
      case pathname === '/usuarios':
        return <UseRegisterForm />;
      case pathname.startsWith('/usuarios/') && pathname !== '/usuarios/listar':
        return <UpdateForm />;
      case pathname === '/usuarios/senha':
        return <DeleteForm />;
      case pathname === '/usuarios/listar':
        return <ListForm />;
      default:
        return null;
    }
  };

  return (
    <PrivateRoute redirectRoute="/usuarios">
      <main className="flex min-h-screen flex-col items-center px-24 pt-10">
        <SubMenu
          subMenuItems={userSubMenuItems}
          activePath={activePath}
          onItemClick={handleMenuItemClick}
        />

        <h1>Página de Usuário</h1>
        {renderForm()}
      </main>
    </PrivateRoute>
  );
};

export default UserPage;
