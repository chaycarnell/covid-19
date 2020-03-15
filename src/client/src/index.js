import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './styles/global-style.css';
import './styles/bootstrap.min.css';

const client = new ApolloClient({
  uri: `${process.env.SERVER_URL}/graphql`
});

const Render = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.render(<Render />, document.querySelector('#root'));
