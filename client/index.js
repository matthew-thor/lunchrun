import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import store from './store';

// establishes socket connection
import './socket';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache(),
});

// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <Routes />
//   </ApolloProvider>,
//   document.getElementById('app')
// );
ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </Provider>,
  document.getElementById('app')
);
