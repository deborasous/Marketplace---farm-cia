import { useRouter } from 'next/router';
import { useState } from 'react';

import PrivateRoute from '@/routes/privateRoute';
import SubMenu, { SubMenuItem } from '../../components/subMenu';
import { BiArrowBack } from 'react-icons/bi';

const ProductsPage: React.FC = () => {
  const [activePath, setActivePath] = useState('/produtos');
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
      path: '/produtos/listar',
    },
    {
      name: 'Cadastrar',
      path: '/produtos/cadastrar',
    },
    {
      name: 'Excluir',
      path: '/produtos/excluir',
    },
    {
      name: 'Alterar',
      path: '/produtos/alterar',
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
        <h1>Produtos</h1>
        <p>Aqui você pode exibir o conteúdo da página de produtos.</p>
      </div>
    </PrivateRoute>
  );
};

export default ProductsPage;
