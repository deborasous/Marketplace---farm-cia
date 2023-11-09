import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar } from './Sidebar';
import Divider from '@mui/material/Divider';
// import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MedicationIcon from '@mui/icons-material/Medication';
import logo from '../../assets/imagens/logo.png';
import { List, ListItem } from '@mui/material';
import { Avatar } from '@mui/material';
import { ListItemText } from '@mui/material';
import { UseAuth } from '../../contexts/Hooks/useAuth';
import { AuthContext } from '../../contexts/auth';

export const Navbar = ({ children }) => {
  const { logout } = UseAuth();
  const navigate = useNavigate();
  const { tipoUsuario, nomeCompleto, setTipoUsuario, setNomeCompleto } =
    UseAuth();
  const [drawerState, setDrawerState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const authContext = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    localStorage.clear();
    setNomeCompleto('');
    setTipoUsuario('');
    navigate('/');
  };

  useEffect(() => {
    const usuarioRecuperado = localStorage.getItem('usuario');
    const tokenExpirado = !localStorage.getItem('token');

    if (usuarioRecuperado && !tokenExpirado) {
      const usuarioLogado = JSON.parse(usuarioRecuperado);
      setTipoUsuario(usuarioLogado.tipoUsuario);
      setNomeCompleto(usuarioLogado.nomeCompleto);
    } else {
      setTipoUsuario('');
      setNomeCompleto('');
    }
  }, [tipoUsuario, nomeCompleto]);

  const navbarStyles = {
    backgroundColor: 'rgb(222, 226, 225)',
    color: 'rgb(51 65 85)',
  };

  const menuItems = [
    {
      text: 'Suas Vendas',
      route: '/admin/vendas/lista',
    },
    {
      text: 'Relatórios',
      route: '/admin/dashboard',
    },
    {
      text: 'Medicamentos',
      route: '/admin/medicamentos/criar',
    },
    {
      text: 'Usuários',
      route: '/admin/cadastro/usuario',
    },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="px-8 shadow-sm" sx={navbarStyles}>
          <Toolbar className="flex justify-between h-20 ">
            <ListItem
              component={Link}
              to="/comprador/medicamentos"
              style={{ cursor: 'pointer' }}
            >
              <img src={logo} alt="logo" className="w-auto h-16" />
            </ListItem>

            {tipoUsuario === 'Administrador' ? (
              <List className="flex">
                {menuItems.map((item, index) => (
                  <ListItem
                    className="px-[10px]"
                    key={item.text}
                    disablePadding
                  >
                    <Link to={item.route}>
                      <ListItemText
                        primary={item.text}
                        className="whitespace-nowrap"
                      />
                    </Link>
                  </ListItem>
                ))}
                <ListItem className="flex gap-2 px-3">
                  <Avatar />
                  <ListItemText
                    primary={
                      authContext.authenticated ? authContext.nomeCompleto : ''
                    }
                  />
                </ListItem>
                <ListItem
                  className="flex gap-1 px-3 py-0"
                  onClick={handleLogout}
                  style={{ cursor: 'pointer' }}
                >
                  <ListItemText primary="Sair" />
                </ListItem>
                <Divider />
              </List>
            ) : (
              <List className="menu-comprador flex flex-row">
                <ListItem
                  component={Link}
                  to="/comprador/minhas-compras"
                  style={{ cursor: 'pointer' }}
                >
                  <ListItemText
                    primary="Minhas Compras"
                    className="whitespace-nowrap"
                  />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/comprador/medicamentos"
                  style={{ cursor: 'pointer' }}
                >
                  <ListItemText primary="Medicamentos" />
                </ListItem>
                {tipoUsuario ? (
                  <>
                    <ListItem>
                      <Avatar />
                      <ListItemText
                        primary={
                          authContext.authenticated
                            ? authContext.nomeCompleto
                            : ''
                        }
                      />
                    </ListItem>
                    <ListItem
                      onClick={handleLogout}
                      style={{ cursor: 'pointer' }}
                    >
                      <ListItemText primary="Sair" />
                    </ListItem>
                  </>
                ) : (
                  <ListItem
                    component={Link}
                    to="/comprador/cadastro"
                    style={{ cursor: 'pointer' }}
                  >
                    <ListItemText primary="Cadastrar" />
                  </ListItem>
                )}
              </List>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <>{children}</>
    </>
  );
};
