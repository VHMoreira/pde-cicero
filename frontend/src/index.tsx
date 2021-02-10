import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import GlobalStyle from './shared/styles/global';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Layout />
  </React.StrictMode>,
  document.getElementById('root')
);
