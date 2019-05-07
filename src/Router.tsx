import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { Home, Login, Welcome, Register } from './pages';
import { ApplicationState } from './store';
import { If } from './commons';
import { Header } from './components';

const Router = ({ auth }: ApplicationState) => (
  <div>
    <BrowserRouter>
      <Header />
      <If test={auth.logged}>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </If>

      <If test={!auth.logged}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/" component={Welcome} />
        </Switch>
      </If>
    </BrowserRouter>
  </div>
);

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Router);
