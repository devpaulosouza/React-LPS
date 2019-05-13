import React, { Component } from 'react';

import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentsProps, Link } from 'react-router-dom';
import { History } from 'history';
import { Form, FormGroup, Label, Button, Col, Row } from 'reactstrap';

import { ApplicationState } from '../../store';
import * as AuthActions from '../../store/ducks/auth/actions';
import { User, AuthState } from '../../store/ducks/auth/types';
import { InputValidator } from '../../commons';

interface StateProps extends RouteComponentsProps {
  email: string;
  password: string;
  confirmPassword: string;
  emailValid: boolean;
  passwordValid: boolean;
  confirmPasswordValid: boolean;
  samePassword: boolean;
}

interface DispatchProps {
  auth: AuthState;
  history: History;
  registerRequest(user: User): void;
}

class Login extends Component<DispatchProps, StateProps> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      emailValid: false,
      passwordValid: false,
      confirmPasswordValid: false,
      samePassword: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.verifyPasswords = this.verifyPasswords.bind(this);
    this.disableSendButton = this.disableSendButton.bind(this);
  }

  componentDidUpdate() {
    const { auth, history } = this.props;

    if (auth.logged) {
      history.push('/');
    }
  }

  handleSubmit() {
    const { registerRequest } = this.props;
    const { email, password } = this.state;

    registerRequest({ email, password });
  }

  handleCancel() {
    const { history } = this.props;
    this.setState({ email: '', password: '', confirmPassword: '' });
    history.push('/');
  }

  verifyPasswords() {
    const { password, confirmPassword } = this.state;

    this.setState(prevState => ({
      ...prevState,
      samePassword: password === confirmPassword || (!password || !confirmPassword),
    }));
  }

  disableSendButton() {
    const {
      emailValid,
      passwordValid,
      confirmPasswordValid,
      email,
      password,
      confirmPassword,
      samePassword,
    } = this.state;

    return (
      !emailValid ||
      !passwordValid ||
      !confirmPasswordValid ||
      (!email || !password || !confirmPassword || !samePassword)
    );
  }

  render() {
    const {
      email,
      password,
      confirmPassword,
      emailValid,
      passwordValid,
      confirmPasswordValid,
      samePassword,
    } = this.state;

    const { auth } = this.props;

    return (
      <div className="bg-gradient">
        <div className="container d-flex justify-content-center align-items-center">
          <Form className="mt-3 w-50">
            <Row>
              <h1 className="display-4 ml-2">Cadastrar</h1>
            </Row>
            <FormGroup row>
              <Label sm={2} for="email">
                Email
              </Label>
              <Col sm={10}>
                <InputValidator
                  id="email"
                  type="email"
                  placeholder="e-mail"
                  value={email}
                  onChange={({ target }) =>
                    this.setState(prevState => ({ ...prevState, email: target.value }))
                  }
                  isValid={test => {
                    if (emailValid !== test) {
                      this.setState(prevState => ({ ...prevState, emailValid: test }));
                    }
                  }}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} for="password">
                Senha
              </Label>
              <Col sm={5}>
                <InputValidator
                  id="password"
                  error="auth/passwords-min-length"
                  onChange={({ target }) => {
                    this.setState(prevState => ({ ...prevState, password: target.value }));
                  }}
                  type="password"
                  value={password}
                  placeholder="senha"
                  onBlur={this.verifyPasswords}
                  isValid={test => {
                    if (passwordValid !== test) {
                      this.setState(prevState => ({ ...prevState, passwordValid: test }));
                    }
                  }}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} for="confirm-password">
                Confirmar
              </Label>
              <Col sm={5}>
                <InputValidator
                  id="confirm-password"
                  error="auth/passwords-doent-match"
                  onChange={({ target }) => {
                    this.setState(prevState => ({ ...prevState, confirmPassword: target.value }));
                  }}
                  type="password"
                  value={confirmPassword}
                  placeholder="confirme a senha"
                  isValid={test => {
                    if (confirmPasswordValid !== test) {
                      this.setState(prevState => ({ ...prevState, confirmPasswordValid: test }));
                    }
                  }}
                  onBlur={this.verifyPasswords}
                  required
                />
                <small hidden={samePassword} className="text-danger">
                  auth/passwords-doesnt-match
                </small>
                <small hidden={!auth.error} className="text-danger">
                  {auth.errorCode}
                </small>
              </Col>
            </FormGroup>

            <Row>
              <Col>
                <p className="text-right">
                  Já possui conta?
                  <Link className="ml-2" to="/login">
                    Entrar
                  </Link>
                </p>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col className="d-flex flex-row-reverse">
                <Button
                  disabled={this.disableSendButton()}
                  size="lg"
                  color="success"
                  onClick={this.handleSubmit}>
                  Cadastrar
                </Button>
                <Button className="mr-2" outline color="danger" onClick={this.handleCancel}>
                  Cancelar
                </Button>
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
