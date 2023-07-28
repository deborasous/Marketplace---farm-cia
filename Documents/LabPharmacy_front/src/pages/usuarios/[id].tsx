import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import PrivateRoute from '@/routes/privateRoute';
import SubMenu, { SubMenuItem } from '../../components/subMenu';
import UpdateForm from '../../components/forms/UpdateForm';
import InputId from '../../components/forms/inputId';
import generateUserSubMenuItems from '@/components/forms/userSubMenuItems';
import { api } from '@/service/api';
import { User } from '@/components/forms/form';

const formFields = [
  { label: 'Name', name: 'name', type: 'text', required: true },
  { label: 'Surname', name: 'surname', type: 'text', required: true },
  {
    label: 'Gênero',
    name: 'gender',
    type: 'select',
    required: false,
    options: [
      { value: 'male', label: 'Masculino' },
      { value: 'female', label: 'Feminino' },
      { value: 'other', label: 'Outros' },
    ],
  },
  { label: 'Celular', name: 'cellPhone', type: 'text', required: false },
];

const UserIdPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [activePath, setActivePath] = useState('/usuarios');
  const [userId, setUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  console.log(userData, 'userdata');

  useEffect(() => {
    if (id) {
      const idNumber = Number(id);
      if (!isNaN(idNumber)) {
        setUserId(idNumber);
      }
    }
  }, [id]);

  const fetchUserById = async (id: number) => {
    try {
      const response = await api.get(`/api/usuarios/${id}`);
      if (response.status === 200) {
        setUserData(response.data.user);
        console.log(response.data.user, 'afsfsd');
      } else {
        setError('Não foi possível obter os dados do usuário.');
        setShowMessage(true);
      }
    } catch (error) {
      setError('Erro ao obter os dados do usuário.');
      setShowMessage(true);
      console.error('erro', error);
    }
  };

  const handleInputChange = (value: number) => {
    setUserId(value);
    if (value !== null) {
      fetchUserById(value);
    }
    router.push(`/usuarios/${value}`);
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
        <h1>Alterar dados do usuário</h1>
        <InputId value={userId} onChange={handleInputChange} />
        <UpdateForm
          id={userId}
          userData={userData !== null ? userData : null}
          setUserData={setUserData}
          formFields={formFields}
        />
      </main>
    </PrivateRoute>
  );
};

export default UserIdPage;
