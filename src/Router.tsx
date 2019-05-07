import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { Home, Login, Welcome } from './components';
import { ApplicationState } from './store';
import { If } from './commons';

const Router = ({ auth }: ApplicationState) => (
  <BrowserRouter>
    <If test={auth.logged}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </If>

    <If test={!auth.logged}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Welcome} />
      </Switch>
    </If>
  </BrowserRouter>
);

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Router);
