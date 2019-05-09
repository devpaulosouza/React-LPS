import React from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import './static/css/main.css';
import store from './store';
import Router from './Router';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
