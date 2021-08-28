import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://payments.sandbox.braintree-api.com/graphql',
});

const encodeBase64 = (str) => {
  return window.btoa(unescape(encodeURIComponent(str)));
};

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: "Basic " +
      encodeBase64(
        `${process.env.REACT_APP_PUBLIC_KEY}:${process.env.REACT_APP_PRIVATE_KEY}`
      ),
    "Braintree-Version": "2019-12-17",
    "Content-Type": "application/json",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);