import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PrivateRoute from '@/routes/privateRoute';
import SubMenu, { SubMenuItem } from '../../../components/subMenu';
import StatusForm from '../../../components/forms/StatusForm';
import InputId from '../../../components/forms/inputId';
import generateUserSubMenuItems from '@/components/forms/userSubMenuItems';
import { api } from '@/service/api';
import { User } from '@/components/forms/form';

const formFields = [
  {
    label: 'Status',
    name: 'status',
    type: 'select',
    required: true,
    options: [
      { value: 'Ativo', label: 'Ativo' },
      { value: 'Inativo', label: 'Inativo' },
    ],
  },
];

const UserStatus: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [activePath, setActivePath] = useState('/usuarios');
  const [userId, setUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  console.log(userData, 'userdata');

  const fetchUserById = async (id: number) => {
    try {
      const response = await api.get(`/api/usuarios/${id}`);
      if (response.status === 200) {
        setUserData(response.data.user);
        setShowMessage(true);
        console.log(response.data.user, 'afsfsd');
      } else {
        setError('Nenhum usuário encontrado com esse ID.');
        setShowMessage(true);
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      setError('Erro ao obter o Status do usuário.');
      setShowMessage(true);
      console.error('erro', error);
    }
  };

  const handleInputChange = (value: number) => {
    setUserId(value);

    if (value !== null) {
      fetchUserById(value); // Fetch user data when the user clicks on the InputId component
    }
    router.push(`/usuarios/${value}/status`);
  };

  const handleMenuItemClick = (path: string) => {
    setActivePath(path);
    router.push(path);
  };

  const userSubMenuItems: SubMenuItem[] = generateUserSubMenuItems(id);

  console.log('userData:', userData);
  console.log('userId:', userId);

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
        <h1>Alterar Status do usuário</h1>
        <InputId value={userId} onChange={handleInputChange} />
        <StatusForm
          id={userId}
          userData={userData !== null ? userData : { status: '' }}
          setUserData={setUserData}
          formFields={formFields}
        />
      </main>
    </PrivateRoute>
  );
};

export default UserStatus;
