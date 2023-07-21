import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchBar from './searchBar';

interface MenuItem {
  name: string;
  path: string;
  isPrivate?: boolean;
}

const menuItem: MenuItem[] = [
  { name: 'Home', path: '/' },
  {
    name: 'Produtos',
    path: '/produtos',
    isPrivate: true,
  },

  {
    name: 'Lojas',
    path: '/depositos',
    isPrivate: true,
  },

  {
    name: 'Usuários',
    path: '/usuarios',
    isPrivate: true,
  },
  {
    name: 'Login',
    path: '/usuarios/login',
  },
  {
    name: 'Cadastrar',
    path: '/usuarios/cadastrar',
  },
];

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-300 px-6 pt-6 pb-4 w-full">
      <ul className="w-full block flex-grow lg:flex lg:items-center lg:w-auto ">
        <div className="text-base lg:flex-grow lg:flex gap-5">
          {menuItem.map((item) => {
            return (
              <li
                key={item.path}
                className={`${router.pathname === item.path ? 'active' : ''} `}
              >
                <Link
                  className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-white mr-2"
                  href={item.path}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </div>
      </ul>
      <div>
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
