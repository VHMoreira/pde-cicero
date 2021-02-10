import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../routes';
import { StoreProvider } from 'easy-peasy';
import { LayoutContainer, Menu, MenuItem } from './styles';
import Logo from '../assets/logo.png';
import { stores } from '../providers/store';

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Router>
        <Menu>
          <img src={Logo} alt='pde-cicero-logo' />
          <MenuItem to='/'>
            <li>
              <p>
                Produtos
              </p>
            </li>
          </MenuItem>
          <MenuItem to='/orders'>
            <li>
              <p>
                Pedidos
              </p>
            </li>
          </MenuItem>

        </Menu>
        <StoreProvider store={stores}>
          <Routes />
        </StoreProvider>
      </Router>
    </LayoutContainer>
  );
}

export default Layout;
