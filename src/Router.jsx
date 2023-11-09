import { toast } from 'react-toastify';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { FinalizarCompraPage } from './pages/FinalizarCompra/FinalizarCompraPage';
import { MedicamentosListaComprador } from './pages/Medicamentos/MedicamentosListaComprador';
import { MedicamentoAdmin } from './pages/Medicamentos/MedicamentoAdmin';
import { MedicamentoCreate } from './components/Medicamentos/MedicamentoCreate';
import { Login } from './pages/Login/Login';
import { AdminDashboard } from './pages/Dashboard/Dashboard';
import { AuthProvider, AuthContext } from './contexts/auth';
import { useContext } from 'react';
import { CadastroUsuarios } from './pages/CadastrarUsuarios/CadastroUsuarios';
import { Navegacao } from './pages/SideBar/Navegacao';
import { Faq } from './pages/Duvidas/Faq';
import { PageNotFound } from './pages/SideBar/404';
import { ListarVendasAdmin } from './pages/VendasAdmin/VendasAdmin';
import { ListaCompras } from './pages/ListaCompras/ListaCompras';
import { CadastroComprador } from './pages/CadastrarUsuarios/CadastroComprador';
import { RecoverPassword } from './pages/RecoverPassword/RecoverPassword';
import { UsuarioProvider } from './contexts/usuario';
import Footer from './components/organisms/footer/Footer';
import { ReportProvider } from './contexts/ReportProvider';
import { ProductInStock } from "./components/organisms/estoque/ProductInStock";

const AppRouter = () => {
  const PrivateAdmin = ({ children }) => {
    const { authenticated, user } = useContext(AuthContext);
    if (!authenticated || user.tipoUsuario !== 'Administrador') {
      toast.error('Acesso negado para esse tipo de usuário.');
      return <Navigate to="/" />;
    }
    return children;
  };
  const PrivateComprador = ({ children }) => {
    const { authenticated, user } = useContext(AuthContext);
    if (!authenticated || user.tipoUsuario !== 'Comprador') {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <ReportProvider>
          <UsuarioProvider>
            <Navegacao />
            <Routes>
              <Route exact path="/" element={<Login />} /> {/* 01 e 09 ok*/}
              <Route exact path="/faq" element={<Faq />} /> {/* menu 'faq'*/}
              <Route path="*" element={<PageNotFound />} />
              <Route
                exact
                path="/comprador/cadastro"
                element={<CadastroComprador />}
              />
              <Route
                exact
                path="/recuperar-senha"
                element={<RecoverPassword />}
              />
              <Route
                exact
                path="/admin/dashboard" //menu 'Resultado de vendas'
                element={
                  <PrivateAdmin>
                    <AdminDashboard />
                  </PrivateAdmin>
                }
              />{' '}
              {/* 01 e 02 */}
              <Route
                exact
                path="/admin/dashboard/produtos-em-estoque" //menu 'Resultado de vendas'
                element={
                  <PrivateAdmin>
                    <ProductInStock />
                  </PrivateAdmin>
                }
              />{' '}

              <Route
                path="/admin/cadastro/usuario" //menu 'Usuarios'
                element={
                  <PrivateAdmin>
                    <CadastroUsuarios />
                  </PrivateAdmin>
                }
              />{' '}
              {/* 01 e 02 */}
              <Route
                path="/admin/medicamentos/criar" //menu 'Cadatro Medicamento'
                element={
                  <PrivateAdmin>
                    <MedicamentoAdmin />
                  </PrivateAdmin>
                }
              />{' '}
              {/* 01 e 02 */}
              <Route
                exact
                path="/admin/vendas/lista" //menu 'lista de vendas'
                element={
                  <PrivateAdmin>
                    <ListarVendasAdmin />
                  </PrivateAdmin>
                }
              />{' '}
              {/* 01 e 02 */}
              <Route
                path="/comprador/medicamentos" //menu 'Medicamentos'
                element={
                  <PrivateComprador>
                    <MedicamentosListaComprador />
                  </PrivateComprador>
                }
              />
              {/* 01 e 02 */}
              <Route
                path="/comprador/minhas-compras" //menu 'Minhas compras'
                element={
                  <PrivateComprador>
                    <ListaCompras />
                  </PrivateComprador>
                }
              />{' '}
              {/* 01 e 02 */}
              <Route
                path="/comprador/cadastro"
                element={
                  <PrivateComprador>
                    <CadastroComprador />
                  </PrivateComprador>
                }
              />{' '}
              {/* 01 e 02 */}
              <Route
                path="/finalizar"
                element={
                  <PrivateComprador>
                    <FinalizarCompraPage />
                  </PrivateComprador>
                }
              />{' '}
              {/* 01 e 02 */}
            </Routes>
            <Footer />
          </UsuarioProvider>
        </ReportProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
