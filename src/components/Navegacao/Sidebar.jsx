import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MedicationIcon from '@mui/icons-material/Medication';
import { Link } from 'react-router-dom';

export const Sidebar = ({ state, setState, toggleDrawer }) => {
  const menuItems = [
    {
      text: 'Cadastrar Medicamento',
      icon: <MedicationIcon />,
      route: '/admin/medicamentos/criar',
    },
    {
      text: 'Lista de Vendas',
      icon: <MonetizationOnIcon />,
      route: '/admin/vendas/lista',
    },
    {
      text: 'Resultados de Vendas',
      icon: <AdminPanelSettingsIcon />,
      route: '/admin/dashboard',
    },
    {
      text: 'Usuários',
      icon: <AccountCircleIcon />,
      route: '/admin/cadastro/usuario',
    },
  ];

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="pt-4">
        {menuItems.map((item, index) => (
          <ListItem className="px-2 py-2" key={item.text} disablePadding>
            <Link to={item.route} className="flex">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </Link>
          </ListItem>
        ))}
        <Divider />
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};
