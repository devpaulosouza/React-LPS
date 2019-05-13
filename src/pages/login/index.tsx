import React, { Component } from 'react';

import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { History } from 'history';
import { Form, FormGroup, Label, Button, Col, Row } from 'reactstrap';

import { ApplicationState } from '../../store';
import * as AuthActions from '../../store/ducks/auth/actions';
import { User, AuthState } from '../../store/ducks/auth/types';
import { InputValidator } from '../../commons';

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
      emailValid: false,
      passwordValid: false,
    };

    this.login = this.login.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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

  handleCancel() {
    const { history } = this.props;
    this.setState({ email: '', password: '' });
    history.push('/');
  }

  handleSubmit() {
    const { authRequest } = this.props;
    const { email, password } = this.state;

    authRequest({ email, password });
  }

  disableSubmitButton() {
    const { email, password, emailValid, passwordValid } = this.state;
    return !emailValid || !passwordValid || (!email || !password);
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
                <InputValidator
                  id="email"
                  onChange={({ target }) => {
                    this.setState(prevState => ({ ...prevState, email: target.value }));
                  }}
                  type="email"
                  value={email}
                  placeholder="e-mail"
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
                  onChange={({ target }) => {
                    this.setState(prevState => ({ ...prevState, password: target.value }));
                  }}
                  type="password"
                  value={password}
                  placeholder="senha"
                  isValid={test => {
                    if (passwordValid !== test) {
                      this.setState(prevState => ({ ...prevState, passwordValid: test }));
                    }
                  }}
                  required
                />
              </Col>
            </FormGroup>
            <Row>
              <Col>
                <small hidden={!auth.error} className="text-danger">
                  {auth.errorCode}
                </small>
                <p className="text-right">
                  Não possui conta?
                  <Link className="ml-2" to="/register">
                    Cadastrar
                  </Link>
                </p>

                <Row className="d-flex flex-row-reverse">
                  <Button
                    disabled={this.disableSubmitButton()}
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
