import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import GlobalStyle from './shared/styles/global';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Layout />
  </React.StrictMode>,
  document.getElementById('root')
);
