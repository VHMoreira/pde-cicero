import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../routes';
import { StoreProvider } from 'easy-peasy';
import { storeProducts } from '../providers/products.store';
import { LayoutContainer, Menu, MenuItem } from './styles';
import Logo from '../assets/logo.png';

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Router>
        <Menu>
          <img src={Logo} />
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
        <StoreProvider store={storeProducts}>
          <Routes />
        </StoreProvider>
      </Router>
    </LayoutContainer>
  );
}

export default Layout;
