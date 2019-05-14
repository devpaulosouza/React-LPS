import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';

import * as AuthActions from './store/ducks/auth/actions';
import { Home, Login, Welcome, Register, Contact, About, Profile } from './pages';
import { ApplicationState } from './store';
import { If } from './commons';
import { Header } from './components';
import { AuthState, User } from './store/ducks/auth/types';

interface DispatchProps {
  auth?: AuthState;
  history?: History;
  authRequest?(user: User): void;
}

class Router extends Component<DispatchProps> {
  async componentDidMount() {
    const { authRequest } = this.props;
    authRequest({ email: '', password: '' });
  }

  render() {
    const { auth } = this.props;
    return (
      <BrowserRouter>
        <Header />
        <If test={auth.logged}>
          <Switch>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about-us" component={About} />
            <Route path="/" component={Home} />
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
  }
}

const mapDispathToProps = (dispath: Dispatch) => bindActionCreators(AuthActions, dispath);

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(Router);
