import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';

import * as AuthActions from './store/ducks/auth/actions';
import { Home, Login, Register, Contact, About, Profile, Welcome } from './pages';
import { ApplicationState } from './store';
import { Header } from './components';
import { AuthState, User } from './store/ducks/auth/types';

interface DispatchProps {
  auth?: AuthState;
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
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about-us" component={About} />

          {auth.logged ? (
            <Switch>
              <Route exact path="/profile" component={Profile} />
              <Route path="/" component={Home} />
            </Switch>
          ) : (
            <Route path="/" component={Welcome} />
          )}
        </Switch>
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
