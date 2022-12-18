import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

import { ApolloProvider } from '@apollo/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import client from './startup/apollo';
import { store } from './redux/store';

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Web3ReactProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
