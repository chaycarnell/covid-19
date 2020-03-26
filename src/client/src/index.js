import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from './apolloClient';
import './styles/global-style.css';
import './styles/bootstrap.min.css';

const Render = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.render(<Render />, document.querySelector('#root'));
