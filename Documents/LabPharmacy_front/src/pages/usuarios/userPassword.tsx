import React, { useEffect, useState } from 'react';
import PassswordForm from '../../components/forms/password';
import PrivateRoute from '@/routes/privateRoute';
import generateUserSubMenuItems from '@/components/forms/userSubMenuItems';
import SubMenu, { SubMenuItem } from '@/components/subMenu';
import { useRouter } from 'next/router';
const UserPassword = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activePath, setActivePath] = useState('/usuarios');
  const [userId, setUserId] = useState<number | null>(null);


  const handleMenuItemClick = (path: string) => {
    setActivePath(path);
    router.push(path);
  };

  const userSubMenuItems: SubMenuItem[] = generateUserSubMenuItems(id);
  return (
    <PrivateRoute redirectRoute="/usuarios/login">
      <div className="flex bg-gray-200 w-full p-4">
        <SubMenu
          subMenuItems={userSubMenuItems}
          activePath={activePath}
          onItemClick={handleMenuItemClick}
        />
      </div>
      <main className="flex min-h-screen flex-col items-center px-24 pt-10">
        <h1>Senha</h1>
      </main>
    </PrivateRoute>
  );
};

export default UserPassword;
