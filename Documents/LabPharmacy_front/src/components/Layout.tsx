import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import UseRegisterForm from '../components/forms/RegisterForm';
import UserIdPage from '../pages/usuarios/[id]';
import UserPassword from '../pages/usuarios/userPassword';
import PrivateRoute from '@/routes/privateRoute';
import SubMenu, { SubMenuItem } from '../components/subMenu';
import { BiArrowBack } from 'react-icons/bi';

interface LayoutProps {
  router: NextRouter;
  id?: string | undefined;
}

const Layout: React.FC<LayoutProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activePath, setActivePath] = useState('/usuarios');

  const handleMenuItemClick = (path: string) => {
    setActivePath(path);
    router.push(path);
  };

  const userSubMenuItems: SubMenuItem[] = [
   
  ];

  const renderForm = () => {
    const { pathname } = router;
    console.log('Current pathname:', pathname);

    switch (true) {
      case pathname === '/usuarios':
        console.log('Rendering UseRegisterForm');
        return <UseRegisterForm />;
      case pathname.startsWith(`/usuarios/${id}`):
        console.log('Rendering UpdateForm');
        return <UserIdPage />;
      case pathname === '/usuarios/senha':
        console.log('Rendering DeleteForm');
        return <UserPassword />;
      default:
        console.log('Rendering null');
        return null;
    }
  };

  return (
    <div>
      <div className="flex bg-gray-200 w-full p-4">
        <SubMenu
          subMenuItems={userSubMenuItems}
          activePath={activePath}
          onItemClick={handleMenuItemClick}
        />
      </div>
      {renderForm()}
    </div>
  );
};

export default Layout;
