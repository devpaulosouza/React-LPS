import React from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { Home, Login } from './components';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Router;
