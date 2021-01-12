import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import configureStore, { history } from './configureStore';
import App from 'containers/App';

const store = configureStore();

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
      <ReduxToastr timeOut={4000} preventDuplicates closeOnToastrClick />
    </ConnectedRouter>
  </Provider>
);
