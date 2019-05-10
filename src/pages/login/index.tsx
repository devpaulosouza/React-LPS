import React, { Component } from 'react';

import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { History } from 'history';
import { Form, FormGroup, Label, Button, Input, Col, Row } from 'reactstrap';

import { ApplicationState } from '../../store';
import * as AuthActions from '../../store/ducks/auth/actions';
import { User, AuthState } from '../../store/ducks/auth/types';

interface StateProps {
  email: string;
  password: string;
  emailValid: boolean;
  passwordValid: boolean;
}

interface DispatchProps {
  auth: AuthState;
  history: History;
  authRequest(user: User): void;
}

class Login extends Component<DispatchProps, StateProps> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailValid: true,
      passwordValid: true,
    };

    this.login = this.login.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  componentDidUpdate() {
    const { auth, history } = this.props;
    if (auth.logged) {
      history.push('/');
    }
  }

  login() {
    const { authRequest } = this.props;
    const { auth } = this.props;

    authRequest(auth.user);
  }

  validateEmail() {
    const { email } = this.state;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    this.setState(prevState => ({ ...prevState, emailValid }));
  }

  validatePassword() {
    const { password } = this.state;
    this.setState(prevState => ({ ...prevState, passwordValid: password.length > 0 }));
  }

  handleCancel() {
    const { history } = this.props;
    this.setState({ email: '', password: '' });
    history.push('/');
  }

  handleSubmit() {
    const { authRequest } = this.props;
    const { email, password, emailValid } = this.state;

    if (emailValid) {
      authRequest({ email, password });
    }
  }

  render() {
    const { email, password, emailValid, passwordValid } = this.state;
    const { auth } = this.props;

    return (
      <div className="bg-gradient">
        <div className="container d-flex justify-content-center align-items-center">
          <Form className="mt-3 w-50">
            <Row>
              <h1 className="display-4 ml-2">Entrar</h1>
            </Row>
            <FormGroup row>
              <Label sm={2} for="email">
                Email
              </Label>
              <Col sm={10}>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="e-mail"
                  value={email}
                  onChange={({ target }) => {
                    this.setState(prevState => ({ ...prevState, email: target.value }));
                  }}
                  onBlur={this.validateEmail}
                />

                <small hidden={emailValid} className="text-danger">
                  auth/email-invalid
                </small>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} for="password">
                Senha
              </Label>
              <Col sm={5}>
                <Input
                  type="password"
                  id="password"
                  placeholder="senha"
                  value={password}
                  onChange={({ target }) =>
                    this.setState(prevState => ({ ...prevState, password: target.value }))
                  }
                  onBlur={this.validatePassword}
                />
                <small hidden={passwordValid} className="text-danger">
                  auth/password-invalid
                </small>
                <small hidden={!auth.error} className="text-danger">
                  {auth.errorCode}
                </small>
              </Col>
            </FormGroup>
            <Row>
              <Col>
                <p className="text-right">
                  Não possui conta?
                  <Link className="ml-2" to="/register">
                    Cadastrar
                  </Link>
                </p>

                <Row className="d-flex flex-row-reverse">
                  <Button
                    disabled={!emailValid || !passwordValid}
                    className="ml-2"
                    size="lg"
                    color="success"
                    onClick={this.handleSubmit}>
                    Entrar
                  </Button>
                  <Button outline color="danger" onClick={this.handleCancel}>
                    Cancelar
                  </Button>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
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
)(withRouter(Login));
