import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import PrivateRoute from '@/routes/privateRoute';
import SubMenu, { SubMenuItem } from '../../components/subMenu';
import { NextRouter } from 'next/router';
import UseRegisterForm from '../../components/forms/RegisterForm';
import UserIdPage from '../usuarios/[id]';
import UserStatus from '../usuarios/[id]/status';
import UserPassword from '../usuarios/userPassword';
import generateUserSubMenuItems from '@/components/forms/userSubMenuItems';

interface UserPageProps {
  router: NextRouter;
}

const UserPage: React.FC<UserPageProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activePath, setActivePath] = useState('/usuarios');

  useEffect(() => {
    // Update the activePath based on the presence of id in the route
    if (id) {
      setActivePath('/usuarios');
    } else {
      setActivePath(router.pathname);
    }
  }, [id, router.pathname]);

  const handleMenuItemClick = (path: string) => {
    setActivePath(path);
    router.push(path);
  };

  const userSubMenuItems: SubMenuItem[] = generateUserSubMenuItems(id);

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
      case pathname.startsWith(`/usuarios/${id}/status`):
        console.log('Rendering DeleteForm');
        return <UserStatus />;
      default:
        console.log('Rendering null');
        return null;
    }
  };

  return (
    <PrivateRoute redirectRoute="/usuarios/login">
      <div className="flex bg-gray-200 w-full p-4">
        <SubMenu
          subMenuItems={userSubMenuItems}
          activePath={activePath}
          onItemClick={handleMenuItemClick}
        />
      </div>

      {/* Content */}
      <main className="flex-1 min-h-screen flex-col items-center px-24 pt-10">
        <h1>Página de Usuário</h1>
        {renderForm()}
      </main>
    </PrivateRoute>
  );
};

export default UserPage;
