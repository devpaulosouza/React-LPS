import React from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import translate from 'counterpart';

import './static/css/main.css';
import store from './store';
import Router from './Router';

translate.setLocale('pt-br');
translate.registerTranslations('pt-br', require('./i18n/pt-br.json'));

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
