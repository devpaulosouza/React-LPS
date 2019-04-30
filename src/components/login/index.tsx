import React, { Component } from 'react';

import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ApplicationState } from '../../store';
import * as AuthActions from '../../store/ducks/auth/actions';
import { User, AuthState } from '../../store/ducks/auth/types';

interface StateProps {
  email: string;
  password: string;
}

interface DispatchProps {
  auth: AuthState;
  authRequest(user: User): void;
}

class Login extends Component<DispatchProps, StateProps> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.login = this.login.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  login() {
    const { authRequest } = this.props;
    const { auth } = this.props;

    authRequest(auth.user);
  }

  handleSubmit() {
    const { authRequest } = this.props;
    const { email, password } = this.state;

    authRequest({ email, password });
  }

  render() {
    const { auth } = this.props;
    const { email, password } = this.state;

    return (
      <div>
        <p>{auth.logged ? 'logado' : 'não logado'}</p>
        <form>
          <label htmlFor="email">
            E-mail
            <input
              id="email"
              type="text"
              placeholder="e-mail"
              value={email}
              onChange={({ target }) => this.setState(prevState => ({ ...prevState, email: target.value }))}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={({ target }) => this.setState(prevState => ({ ...prevState, password: target.value }))}
            />
          </label>
          <button type="button" onClick={this.handleSubmit}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth,
});

const mapDispathToProps = (dispath: Dispatch) => bindActionCreators(AuthActions, dispath);

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(Login);
