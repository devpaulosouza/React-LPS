import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { Home, Login, Welcome, Register, Contact, About } from './pages';
import { ApplicationState } from './store';
import { If } from './commons';
import { Header } from './components';

const Router = ({ auth }: ApplicationState) => (
  <BrowserRouter>
    <Header />
    <If test={auth.logged}>
      <Switch>
        <Route path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </If>

    <If test={!auth.logged}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about-us" component={About} />
        <Route path="/" component={Welcome} />
      </Switch>
    </If>
  </BrowserRouter>
);

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Router);
